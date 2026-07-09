using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp.Server.Contracts;
using ReactApp.Server.Data;
using ReactApp.Server.Models;

namespace ReactApp.Server.Controllers.Admin;

[ApiController]
[Route("api/admin/movies")]
[Authorize(Roles = DbSeeder.AdminRole)]
public class AdminMoviesController(CinemaDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MovieDto>>> GetMovies()
    {
        var movies = await db.Movies.AsNoTracking().OrderBy(m => m.Title).ToListAsync();
        return Ok(movies.Select(MoviesController.ToDto));
    }

    [HttpPost]
    public async Task<ActionResult<MovieDto>> CreateMovie(MovieUpsertRequest request)
    {
        var movie = new Movie
        {
            Title = request.Title,
            Description = request.Description,
            PosterUrl = request.PosterUrl,
            DurationMinutes = request.DurationMinutes > 0 ? request.DurationMinutes : 120,
            Tags = string.IsNullOrWhiteSpace(request.Tags) ? "2D | PL (napisy)" : request.Tags,
            IsCurrentlyShowing = request.IsCurrentlyShowing,
            IsUpcoming = request.IsUpcoming,
            IsFamilyFriendly = request.IsFamilyFriendly
        };
        db.Movies.Add(movie);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetMovies), new { id = movie.Id }, MoviesController.ToDto(movie));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<MovieDto>> UpdateMovie(int id, MovieUpsertRequest request)
    {
        var movie = await db.Movies.FindAsync(id);
        if (movie is null) return NotFound();

        movie.Title = request.Title;
        movie.Description = request.Description;
        movie.PosterUrl = request.PosterUrl;
        movie.DurationMinutes = request.DurationMinutes > 0 ? request.DurationMinutes : movie.DurationMinutes;
        movie.Tags = string.IsNullOrWhiteSpace(request.Tags) ? movie.Tags : request.Tags;
        movie.IsCurrentlyShowing = request.IsCurrentlyShowing;
        movie.IsUpcoming = request.IsUpcoming;
        movie.IsFamilyFriendly = request.IsFamilyFriendly;

        await db.SaveChangesAsync();
        return Ok(MoviesController.ToDto(movie));
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteMovie(int id)
    {
        var movie = await db.Movies.FindAsync(id);
        if (movie is null) return NotFound();

        var hasBookings = await db.Bookings.AnyAsync(b => b.Showtime.MovieId == id);
        if (hasBookings)
            return Conflict(new { message = "Nie można usunąć filmu z istniejącymi rezerwacjami." });

        db.Movies.Remove(movie);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
