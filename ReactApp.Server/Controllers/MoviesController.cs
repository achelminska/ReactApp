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
        var query = db.Movies.AsNoTracking();

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

    internal static MovieDto ToDto(Movie m) => new(
        m.Id, m.Title, m.Description, m.PosterUrl, m.DurationMinutes, m.Tags,
        m.IsCurrentlyShowing, m.IsUpcoming, m.IsFamilyFriendly);
}
