using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp.Server.Contracts;
using ReactApp.Server.Data;

namespace ReactApp.Server.Controllers;

[ApiController]
[Route("api/cinemas")]
public class CinemasController(CinemaDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<CinemaDto>>> GetCinemas()
    {
        var cinemas = await db.Cinemas.AsNoTracking()
            .Include(c => c.Halls)
            .OrderBy(c => c.City)
            .ToListAsync();

        return Ok(cinemas.Select(c => new CinemaDto(
            c.Id, c.City, c.Name,
            c.Halls.Select(h => new HallDto(h.Id, h.Name)))));
    }

    [HttpGet("cities")]
    public async Task<ActionResult<IEnumerable<string>>> GetCities()
    {
        var cities = await db.Cinemas.AsNoTracking()
            .OrderBy(c => c.City)
            .Select(c => c.City)
            .ToListAsync();
        return Ok(cities);
    }
}
