using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp.Server.Contracts;
using ReactApp.Server.Data;

namespace ReactApp.Server.Controllers;

[ApiController]
[Route("api/showtimes")]
public class ShowtimesController(CinemaDbContext db) : ControllerBase
{
    /// <summary>Repertuar dla miasta i dnia — filmy z godzinami seansów.</summary>
    [HttpGet("repertoire")]
    public async Task<ActionResult<IEnumerable<RepertoireMovieDto>>> GetRepertoire(
        [FromQuery] string city, [FromQuery] DateTime? date)
    {
        var day = (date ?? DateTime.Today).Date;

        var showtimes = await db.Showtimes.AsNoTracking()
            .Include(s => s.Movie)
            .Include(s => s.Hall).ThenInclude(h => h.Cinema)
            .Where(s => s.Hall.Cinema.City == city
                        && s.StartsAt >= day && s.StartsAt < day.AddDays(1))
            .OrderBy(s => s.StartsAt)
            .ToListAsync();

        var result = showtimes
            .GroupBy(s => s.MovieId)
            .Select(g =>
            {
                var movie = g.First().Movie;
                return new RepertoireMovieDto(
                    movie.Id, movie.Title, movie.PosterUrl, movie.Tags,
                    g.OrderBy(s => s.StartsAt)
                     .Select(s => new RepertoireShowtimeDto(s.Id, s.StartsAt.ToString("HH:mm"))));
            })
            .OrderBy(m => m.Title);

        return Ok(result);
    }

    /// <summary>Szczegóły seansu: układ sali i zajęte miejsca.</summary>
    [HttpGet("{id:int}")]
    public async Task<ActionResult<ShowtimeDetailsDto>> GetShowtime(int id)
    {
        var showtime = await db.Showtimes.AsNoTracking()
            .Include(s => s.Movie)
            .Include(s => s.Hall).ThenInclude(h => h.Cinema)
            .FirstOrDefaultAsync(s => s.Id == id);
        if (showtime is null) return NotFound();

        var occupied = await db.BookingSeats.AsNoTracking()
            .Where(bs => bs.Booking.ShowtimeId == id
                         && bs.Booking.Status != Models.BookingStatus.Cancelled)
            .Select(bs => $"R{bs.Row}S{bs.SeatNumber}")
            .ToListAsync();

        return Ok(new ShowtimeDetailsDto(
            showtime.Id,
            showtime.StartsAt,
            showtime.Movie.Title,
            showtime.Hall.Cinema.City,
            showtime.Hall.Name,
            JsonSerializer.Deserialize<JsonElement>(showtime.Hall.LayoutJson),
            occupied));
    }

    /// <summary>Dostępne daty/filmy/godziny dla miasta — zasila widżet szybkiego zakupu.</summary>
    [HttpGet("options")]
    public async Task<ActionResult> GetOptions([FromQuery] string city)
    {
        var showtimes = await db.Showtimes.AsNoTracking()
            .Include(s => s.Movie)
            .Where(s => s.Hall.Cinema.City == city && s.StartsAt >= DateTime.Now)
            .OrderBy(s => s.StartsAt)
            .Select(s => new { s.Id, s.StartsAt, s.Movie.Title })
            .ToListAsync();

        var byDate = showtimes
            .GroupBy(s => s.StartsAt.Date)
            .ToDictionary(
                g => g.Key.ToString("yyyy-MM-dd"),
                g => g.GroupBy(s => s.Title).ToDictionary(
                    m => m.Key,
                    m => m.Select(s => new { showtimeId = s.Id, time = s.StartsAt.ToString("HH:mm") })));

        return Ok(byDate);
    }
}
