using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using ReactApp.Server.Contracts;
using ReactApp.Server.Data;
using ReactApp.Server.Models;
using ReactApp.Server.Services;
using System.Security.Claims;

namespace ReactApp.Server.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController(
    UserManager<ApplicationUser> userManager,
    TokenService tokenService) : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult<AuthResponse>> Register(RegisterRequest request)
    {
        var user = new ApplicationUser
        {
            UserName = request.Email,
            Email = request.Email,
            City = request.City
        };

        var result = await userManager.CreateAsync(user, request.Password);
        if (!result.Succeeded)
            return BadRequest(new { errors = result.Errors.Select(e => e.Description) });

        await userManager.AddToRoleAsync(user, DbSeeder.UserRole);
        return Ok(await BuildAuthResponse(user));
    }

    [HttpPost("login")]
    public async Task<ActionResult<AuthResponse>> Login(LoginRequest request)
    {
        var user = await userManager.FindByEmailAsync(request.Email);
        if (user is null || !await userManager.CheckPasswordAsync(user, request.Password))
            return Unauthorized(new { message = "Nieprawidłowy e-mail lub hasło." });

        if (user.IsBlocked)
            return Unauthorized(new { message = "Konto zostało zablokowane." });

        return Ok(await BuildAuthResponse(user));
    }

    [Authorize]
    [HttpGet("me")]
    public async Task<ActionResult<UserDto>> Me()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = userId is null ? null : await userManager.FindByIdAsync(userId);
        if (user is null) return Unauthorized();

        var roles = await userManager.GetRolesAsync(user);
        return Ok(new UserDto(user.Id, user.Email!, user.City, roles));
    }

    [Authorize]
    [HttpPut("me")]
    public async Task<ActionResult<UserDto>> UpdateProfile(UpdateProfileRequest request)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = userId is null ? null : await userManager.FindByIdAsync(userId);
        if (user is null) return Unauthorized();

        user.City = string.IsNullOrWhiteSpace(request.City) ? null : request.City;
        var result = await userManager.UpdateAsync(user);
        if (!result.Succeeded)
            return BadRequest(new { errors = result.Errors.Select(e => e.Description) });

        var roles = await userManager.GetRolesAsync(user);
        return Ok(new UserDto(user.Id, user.Email!, user.City, roles));
    }

    [Authorize]
    [HttpPost("change-password")]
    public async Task<IActionResult> ChangePassword(ChangePasswordRequest request)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = userId is null ? null : await userManager.FindByIdAsync(userId);
        if (user is null) return Unauthorized();

        var result = await userManager.ChangePasswordAsync(user, request.CurrentPassword, request.NewPassword);
        if (!result.Succeeded)
            return BadRequest(new { errors = result.Errors.Select(e => e.Description) });

        return NoContent();
    }

    [Authorize]
    [HttpPost("change-email")]
    public async Task<ActionResult<AuthResponse>> ChangeEmail(ChangeEmailRequest request)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        var user = userId is null ? null : await userManager.FindByIdAsync(userId);
        if (user is null) return Unauthorized();

        if (!await userManager.CheckPasswordAsync(user, request.CurrentPassword))
            return BadRequest(new { message = "Nieprawidłowe hasło." });

        var newEmail = request.NewEmail.Trim();
        if (string.Equals(user.Email, newEmail, StringComparison.OrdinalIgnoreCase))
            return BadRequest(new { message = "Nowy adres e-mail jest taki sam jak obecny." });

        if (await userManager.FindByEmailAsync(newEmail) is not null)
            return BadRequest(new { message = "Ten adres e-mail jest już używany przez inne konto." });

        var emailResult = await userManager.SetEmailAsync(user, newEmail);
        if (!emailResult.Succeeded)
            return BadRequest(new { errors = emailResult.Errors.Select(e => e.Description) });

        // Login = e-mail, więc username musi zostać zaktualizowany razem z adresem
        var nameResult = await userManager.SetUserNameAsync(user, newEmail);
        if (!nameResult.Succeeded)
            return BadRequest(new { errors = nameResult.Errors.Select(e => e.Description) });

        // Świeży token — stary ma w claimach poprzedni adres e-mail
        return Ok(await BuildAuthResponse(user));
    }

    private async Task<AuthResponse> BuildAuthResponse(ApplicationUser user)
    {
        var roles = await userManager.GetRolesAsync(user);
        var token = tokenService.CreateToken(user, roles);
        return new AuthResponse(token, new UserDto(user.Id, user.Email!, user.City, roles));
    }
}
