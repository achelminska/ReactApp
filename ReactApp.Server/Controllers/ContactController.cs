using Microsoft.AspNetCore.Mvc;
using ReactApp.Server.Contracts;
using ReactApp.Server.Data;
using ReactApp.Server.Models;

namespace ReactApp.Server.Controllers;

[ApiController]
[Route("api/contact")]
public class ContactController(CinemaDbContext db) : ControllerBase
{
    [HttpPost]
    public async Task<ActionResult> SendMessage(ContactMessageRequest request)
    {
        db.ContactMessages.Add(new ContactMessage
        {
            Name = request.Name,
            Email = request.Email,
            Category = request.Category ?? "",
            Subject = request.Subject ?? "",
            Message = request.Message
        });
        await db.SaveChangesAsync();
        return Ok(new { message = "Wiadomość została wysłana." });
    }
}
