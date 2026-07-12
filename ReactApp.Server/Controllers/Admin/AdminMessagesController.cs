using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp.Server.Data;

namespace ReactApp.Server.Controllers.Admin;

[ApiController]
[Route("api/admin/messages")]
[Authorize(Roles = DbSeeder.AdminRole)]
public class AdminMessagesController(CinemaDbContext db) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult> GetMessages([FromQuery] bool? unreadOnly)
    {
        var query = db.ContactMessages.AsNoTracking();
        if (unreadOnly == true)
            query = query.Where(m => !m.IsRead);

        var messages = await query
            .OrderByDescending(m => m.CreatedAt)
            .Select(m => new
            {
                m.Id,
                m.Name,
                m.Email,
                m.Category,
                m.Subject,
                m.Message,
                m.IsRead,
                m.CreatedAt
            })
            .ToListAsync();

        return Ok(messages);
    }

    [HttpPost("{id:int}/toggle-read")]
    public async Task<ActionResult> ToggleRead(int id)
    {
        var message = await db.ContactMessages.FindAsync(id);
        if (message is null) return NotFound();

        message.IsRead = !message.IsRead;
        await db.SaveChangesAsync();
        return Ok(new { isRead = message.IsRead });
    }

    [HttpDelete("{id:int}")]
    public async Task<ActionResult> DeleteMessage(int id)
    {
        var message = await db.ContactMessages.FindAsync(id);
        if (message is null) return NotFound();

        db.ContactMessages.Remove(message);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
