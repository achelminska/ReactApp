using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp.Server.Contracts;
using ReactApp.Server.Data;

namespace ReactApp.Server.Controllers;

[ApiController]
[Route("api/ticket-types")]
public class TicketTypesController(CinemaDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TicketTypeDto>>> GetTicketTypes()
    {
        var types = await db.TicketTypes.AsNoTracking().OrderBy(t => t.Id).ToListAsync();
        return Ok(types.Select(t => new TicketTypeDto(t.Id, t.Name, t.Price)));
    }
}
