using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp.Server.Contracts;
using ReactApp.Server.Data;

namespace ReactApp.Server.Controllers.Admin;

[ApiController]
[Route("api/admin/bookings")]
[Authorize(Roles = DbSeeder.AdminRole)]
public class AdminBookingsController(CinemaDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<BookingDto>>> GetBookings(
        [FromQuery] string? city, [FromQuery] string? email, [FromQuery] DateTime? date)
    {
        var query = db.Bookings.AsNoTracking()
            .Include(b => b.Seats).ThenInclude(s => s.TicketType)
            .Include(b => b.Showtime).ThenInclude(s => s.Movie)
            .Include(b => b.Showtime).ThenInclude(s => s.Hall).ThenInclude(h => h.Cinema)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(city))
            query = query.Where(b => b.Showtime.Hall.Cinema.City == city);
        if (!string.IsNullOrWhiteSpace(email))
            query = query.Where(b => EF.Functions.Like(b.CustomerEmail, $"%{email}%"));
        if (date is not null)
        {
            var day = date.Value.Date;
            query = query.Where(b => b.CreatedAt >= day && b.CreatedAt < day.AddDays(1));
        }

        var bookings = await query.OrderByDescending(b => b.CreatedAt).Take(500).ToListAsync();
        return Ok(bookings.Select(b => BookingsController.ToDto(b, b.Showtime)));
    }
}
