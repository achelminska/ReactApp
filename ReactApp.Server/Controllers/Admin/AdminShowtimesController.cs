using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp.Server.Contracts;
using ReactApp.Server.Data;
using ReactApp.Server.Models;

namespace ReactApp.Server.Controllers.Admin;

[ApiController]
[Route("api/admin/showtimes")]
[Authorize(Roles = DbSeeder.AdminRole)]
public class AdminShowtimesController(CinemaDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ShowtimeDto>>> GetShowtimes(
        [FromQuery] string? city, [FromQuery] DateTime? date, [FromQuery] int? movieId)
    {
        var query = db.Showtimes.AsNoTracking()
            .Include(s => s.Movie)
            .Include(s => s.Hall).ThenInclude(h => h.Cinema)
            .AsQueryable();

        if (!string.IsNullOrWhiteSpace(city))
            query = query.Where(s => s.Hall.Cinema.City == city);
        if (date is not null)
        {
            var day = date.Value.Date;
            query = query.Where(s => s.StartsAt >= day && s.StartsAt < day.AddDays(1));
        }
        if (movieId is not null)
            query = query.Where(s => s.MovieId == movieId);

        var showtimes = await query.OrderBy(s => s.StartsAt).Take(500).ToListAsync();
        return Ok(showtimes.Select(ToDto));
    }

    [HttpPost]
    public async Task<ActionResult<ShowtimeDto>> CreateShowtime(ShowtimeUpsertRequest request)
    {
        if (!await db.Movies.AnyAsync(m => m.Id == request.MovieId))
            return BadRequest(new { message = "Film nie istnieje." });
        if (!await db.Halls.AnyAsync(h => h.Id == request.HallId))
            return BadRequest(new { message = "Sala nie istnieje." });

        var showtime = new Showtime
        {
            MovieId = request.MovieId,
            HallId = request.HallId,
            StartsAt = request.StartsAt
        };
        db.Showtimes.Add(showtime);
        await db.SaveChangesAsync();

        await db.Entry(showtime).Reference(s => s.Movie).LoadAsync();
        await db.Entry(showtime).Reference(s => s.Hall).LoadAsync();
        await db.Entry(showtime.Hall).Reference(h => h.Cinema).LoadAsync();

        return CreatedAtAction(nameof(GetShowtimes), new { id = showtime.Id }, ToDto(showtime));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<ShowtimeDto>> UpdateShowtime(int id, ShowtimeUpsertRequest request)
    {
        var showtime = await db.Showtimes
            .Include(s => s.Movie)
            .Include(s => s.Hall).ThenInclude(h => h.Cinema)
            .FirstOrDefaultAsync(s => s.Id == id);
        if (showtime is null) return NotFound();

        showtime.MovieId = request.MovieId;
        showtime.HallId = request.HallId;
        showtime.StartsAt = request.StartsAt;
        await db.SaveChangesAsync();

        await db.Entry(showtime).Reference(s => s.Movie).LoadAsync();
        await db.Entry(showtime).Reference(s => s.Hall).LoadAsync();
        await db.Entry(showtime.Hall).Reference(h => h.Cinema).LoadAsync();

        return Ok(ToDto(showtime));
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteShowtime(int id)
    {
        var showtime = await db.Showtimes.FindAsync(id);
        if (showtime is null) return NotFound();

        var hasBookings = await db.Bookings.AnyAsync(b => b.ShowtimeId == id);
        if (hasBookings)
            return Conflict(new { message = "Nie można usunąć seansu z istniejącymi rezerwacjami." });

        db.Showtimes.Remove(showtime);
        await db.SaveChangesAsync();
        return NoContent();
    }

    private static ShowtimeDto ToDto(Showtime s) => new(
        s.Id, s.StartsAt, MoviesController.ToDto(s.Movie), s.Hall.Name, s.Hall.Cinema.City);
}
