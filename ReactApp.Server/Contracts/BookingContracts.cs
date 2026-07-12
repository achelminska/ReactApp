using System.ComponentModel.DataAnnotations;

namespace ReactApp.Server.Contracts;

public record BookingSeatRequest(
    [Required] int Row,
    [Required] int SeatNumber,
    [Required] int TicketTypeId);

public record CreateBookingRequest(
    [Required] int ShowtimeId,
    [Required] string CustomerName,
    [Required] string CustomerSurname,
    [Required, EmailAddress] string CustomerEmail,
    string? CustomerPhone,
    [Required] string PaymentMethod,
    [Required, MinLength(1)] IReadOnlyList<BookingSeatRequest> Seats);

public record BookingDto(
    int Id,
    DateTime CreatedAt,
    string Status,
    int MovieId,
    string MovieTitle,
    string? PosterUrl,
    string City,
    string HallName,
    DateTime ShowtimeStartsAt,
    string CustomerName,
    string CustomerSurname,
    string CustomerEmail,
    string? CustomerPhone,
    decimal TotalPrice,
    decimal ServiceFee,
    string PaymentMethod,
    IEnumerable<BookingSeatDto> Seats);

public record BookingSeatDto(int Row, int SeatNumber, string TicketTypeName, decimal Price);

public record ContactMessageRequest(
    [Required] string Name,
    [Required, EmailAddress] string Email,
    string? Category,
    string? Subject,
    [Required] string Message);
