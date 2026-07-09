using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp.Server.Data;
using ReactApp.Server.Models;
using System.Security.Claims;

namespace ReactApp.Server.Controllers.Admin;

[ApiController]
[Route("api/admin/users")]
[Authorize(Roles = DbSeeder.AdminRole)]
public class AdminUsersController(UserManager<ApplicationUser> userManager) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult> GetUsers()
    {
        var users = await userManager.Users.AsNoTracking()
            .OrderBy(u => u.Email)
            .ToListAsync();

        var result = new List<object>();
        foreach (var user in users)
        {
            var roles = await userManager.GetRolesAsync(user);
            result.Add(new
            {
                user.Id,
                user.Email,
                user.City,
                user.IsBlocked,
                user.CreatedAt,
                Roles = roles
            });
        }
        return Ok(result);
    }

    [HttpPost("{id}/toggle-admin")]
    public async Task<ActionResult> ToggleAdmin(string id)
    {
        var user = await userManager.FindByIdAsync(id);
        if (user is null) return NotFound();

        if (user.Id == User.FindFirstValue(ClaimTypes.NameIdentifier))
            return BadRequest(new { message = "Nie możesz zmienić własnej roli." });

        var isAdmin = await userManager.IsInRoleAsync(user, DbSeeder.AdminRole);
        if (isAdmin)
            await userManager.RemoveFromRoleAsync(user, DbSeeder.AdminRole);
        else
            await userManager.AddToRoleAsync(user, DbSeeder.AdminRole);

        return Ok(new { isAdmin = !isAdmin });
    }

    [HttpPost("{id}/toggle-block")]
    public async Task<ActionResult> ToggleBlock(string id)
    {
        var user = await userManager.FindByIdAsync(id);
        if (user is null) return NotFound();

        if (user.Id == User.FindFirstValue(ClaimTypes.NameIdentifier))
            return BadRequest(new { message = "Nie możesz zablokować własnego konta." });

        user.IsBlocked = !user.IsBlocked;
        await userManager.UpdateAsync(user);
        return Ok(new { isBlocked = user.IsBlocked });
    }
}
