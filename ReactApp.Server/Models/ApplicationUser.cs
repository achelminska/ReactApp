using Microsoft.AspNetCore.Identity;

namespace ReactApp.Server.Models;

public class ApplicationUser : IdentityUser
{
    public string? City { get; set; }
    public bool IsBlocked { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
