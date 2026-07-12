using System.ComponentModel.DataAnnotations;

namespace ReactApp.Server.Contracts;

public record RegisterRequest(
    [Required, EmailAddress] string Email,
    [Required, MinLength(8)] string Password,
    string? City);

public record LoginRequest(
    [Required, EmailAddress] string Email,
    [Required] string Password);

public record AuthResponse(string Token, UserDto User);

public record UserDto(string Id, string Email, string? City, IList<string> Roles);

public record UpdateProfileRequest(string? City);

public record ChangePasswordRequest(
    [Required] string CurrentPassword,
    [Required, MinLength(8)] string NewPassword);

public record ChangeEmailRequest(
    [Required, EmailAddress] string NewEmail,
    [Required] string CurrentPassword);
