using System.ComponentModel.DataAnnotations;

namespace ReactApp.Server.Contracts;

public record RegisterRequest(
    [Required, EmailAddress] string Email,
    [Required, MinLength(6)] string Password,
    string? City);

public record LoginRequest(
    [Required, EmailAddress] string Email,
    [Required] string Password);

public record AuthResponse(string Token, UserDto User);

public record UserDto(string Id, string Email, string? City, IList<string> Roles);
