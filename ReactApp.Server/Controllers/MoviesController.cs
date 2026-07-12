using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp.Server.Contracts;
using ReactApp.Server.Data;
using ReactApp.Server.Models;

namespace ReactApp.Server.Controllers;

[ApiController]
[Route("api/movies")]
public class MoviesController(CinemaDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MovieDto>>> GetMovies(
        [FromQuery] string? category, [FromQuery] string? search)
    {
        // Zarchiwizowane filmy nie są widoczne w publicznym katalogu
        var query = db.Movies.AsNoTracking().Where(m => !m.IsArchived);

        query = category?.ToLowerInvariant() switch
        {
            "now" => query.Where(m => m.IsCurrentlyShowing),
            "upcoming" => query.Where(m => m.IsUpcoming),
            "family" => query.Where(m => m.IsFamilyFriendly),
            _ => query
        };

        if (!string.IsNullOrWhiteSpace(search))
            query = query.Where(m => EF.Functions.Like(m.Title, $"%{search}%"));

        var movies = await query.OrderBy(m => m.Title).ToListAsync();
        return Ok(movies.Select(ToDto));
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<MovieDto>> GetMovie(int id)
    {
        var movie = await db.Movies.AsNoTracking().FirstOrDefaultAsync(m => m.Id == id);
        return movie is null ? NotFound() : Ok(ToDto(movie));
    }

    /// <summary>Seanse danego filmu w wybranym mieście i dniu.</summary>
    [HttpGet("{id:int}/showtimes")]
    public async Task<ActionResult<IEnumerable<MovieShowtimeDto>>> GetMovieShowtimes(
        int id, [FromQuery] string city, [FromQuery] DateTime? date)
    {
        var day = (date ?? DateTime.Today).Date;
        var from = day == DateTime.Today ? DateTime.Now : day;

        var showtimes = await db.Showtimes.AsNoTracking()
            .Include(s => s.Hall).ThenInclude(h => h.Cinema)
            .Where(s => s.MovieId == id
                        && s.Hall.Cinema.City == city
                        && s.StartsAt >= from && s.StartsAt < day.AddDays(1))
            .OrderBy(s => s.StartsAt)
            .ToListAsync();

        return Ok(showtimes.Select(s => new MovieShowtimeDto(
            s.Id, s.StartsAt.ToString("HH:mm"), s.Hall.Name)));
    }

    internal static MovieDto ToDto(Movie m) => new(
        m.Id, m.Title, m.Description, m.PosterUrl, m.DurationMinutes, m.Genre, m.Tags,
        m.IsCurrentlyShowing, m.IsUpcoming, m.IsFamilyFriendly, m.IsArchived);
}
