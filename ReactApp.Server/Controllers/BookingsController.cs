using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp.Server.Contracts;
using ReactApp.Server.Data;
using ReactApp.Server.Models;
using System.Data;
using System.Security.Claims;

namespace ReactApp.Server.Controllers;

[ApiController]
[Route("api/bookings")]
public class BookingsController(CinemaDbContext db) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult<BookingDto>> CreateBooking(CreateBookingRequest request)
    {
        var showtime = await db.Showtimes
            .Include(s => s.Movie)
            .Include(s => s.Hall).ThenInclude(h => h.Cinema)
            .FirstOrDefaultAsync(s => s.Id == request.ShowtimeId);
        if (showtime is null)
            return NotFound(new { message = "Seans nie istnieje." });

        var ticketTypes = await db.TicketTypes.ToDictionaryAsync(t => t.Id);
        foreach (var seat in request.Seats)
        {
            if (!ticketTypes.ContainsKey(seat.TicketTypeId))
                return BadRequest(new { message = $"Nieznany typ biletu: {seat.TicketTypeId}" });
        }

        var requestedSeats = request.Seats.Select(s => (s.Row, s.SeatNumber)).ToHashSet();
        if (requestedSeats.Count != request.Seats.Count)
            return BadRequest(new { message = "Zduplikowane miejsca w rezerwacji." });

        await using var transaction = await db.Database.BeginTransactionAsync(IsolationLevel.Serializable);
        try
        {
            var alreadyTaken = await db.BookingSeats
                .Where(bs => bs.Booking.ShowtimeId == request.ShowtimeId
                             && bs.Booking.Status != BookingStatus.Cancelled)
                .Select(bs => new { bs.Row, bs.SeatNumber })
                .ToListAsync();

            var conflicts = alreadyTaken
                .Where(t => requestedSeats.Contains((t.Row, t.SeatNumber)))
                .Select(t => $"R{t.Row}S{t.SeatNumber}")
                .ToList();
            if (conflicts.Count > 0)
            {
                await transaction.RollbackAsync();
                return Conflict(new { message = "Niektóre miejsca są już zajęte.", seats = conflicts });
            }

            var booking = new Booking
            {
                ShowtimeId = showtime.Id,
                UserId = User.FindFirstValue(ClaimTypes.NameIdentifier),
                CustomerName = request.CustomerName,
                CustomerSurname = request.CustomerSurname,
                CustomerEmail = request.CustomerEmail,
                CustomerPhone = request.CustomerPhone,
                PaymentMethod = request.PaymentMethod,
                ServiceFee = request.Seats.Count * SeedData.ServiceFeePerSeat
            };

            foreach (var seat in request.Seats)
            {
                var type = ticketTypes[seat.TicketTypeId];
                booking.Seats.Add(new BookingSeat
                {
                    Row = seat.Row,
                    SeatNumber = seat.SeatNumber,
                    TicketTypeId = type.Id,
                    Price = type.Price
                });
            }
            booking.TotalPrice = booking.Seats.Sum(s => s.Price) + booking.ServiceFee;

            db.Bookings.Add(booking);
            await db.SaveChangesAsync();
            await transaction.CommitAsync();

            return CreatedAtAction(nameof(GetBooking), new { id = booking.Id }, ToDto(booking, showtime));
        }
        catch (DbUpdateException)
        {
            await transaction.RollbackAsync();
            return Conflict(new { message = "Niektóre miejsca są już zajęte." });
        }
    }

    [Authorize]
    [HttpGet("{id:int}")]
    public async Task<ActionResult<BookingDto>> GetBooking(int id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        var booking = await db.Bookings.AsNoTracking()
            .Include(b => b.Seats).ThenInclude(s => s.TicketType)
            .Include(b => b.Showtime).ThenInclude(s => s.Movie)
            .Include(b => b.Showtime).ThenInclude(s => s.Hall).ThenInclude(h => h.Cinema)
            .FirstOrDefaultAsync(b => b.Id == id && b.UserId == userId);

        return booking is null ? NotFound() : Ok(ToDto(booking, booking.Showtime));
    }

    [Authorize]
    [HttpGet("my")]
    public async Task<ActionResult<IEnumerable<BookingDto>>> GetMyBookings()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var bookings = await db.Bookings.AsNoTracking()
            .Include(b => b.Seats).ThenInclude(s => s.TicketType)
            .Include(b => b.Showtime).ThenInclude(s => s.Movie)
            .Include(b => b.Showtime).ThenInclude(s => s.Hall).ThenInclude(h => h.Cinema)
            .Where(b => b.UserId == userId)
            .OrderByDescending(b => b.CreatedAt)
            .ToListAsync();

        return Ok(bookings.Select(b => ToDto(b, b.Showtime)));
    }

    internal static BookingDto ToDto(Booking b, Showtime showtime) => new(
        b.Id, b.CreatedAt, b.Status.ToString(),
        showtime.Movie.Id,
        showtime.Movie.Title,
        showtime.Movie.PosterUrl,
        showtime.Hall.Cinema.City,
        showtime.Hall.Name,
        showtime.StartsAt,
        b.CustomerName, b.CustomerSurname, b.CustomerEmail, b.CustomerPhone,
        b.TotalPrice, b.ServiceFee, b.PaymentMethod,
        b.Seats.Select(s => new BookingSeatDto(
            s.Row, s.SeatNumber, s.TicketType?.Name ?? "", s.Price)));
}
