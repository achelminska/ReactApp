namespace ReactApp.Server.Models;

public enum BookingStatus
{
    Pending = 0,
    Confirmed = 1,
    Cancelled = 2
}

public class Booking
{
    public int Id { get; set; }
    public int ShowtimeId { get; set; }
    public Showtime Showtime { get; set; } = null!;

    /// <summary>Id użytkownika Identity — null dla rezerwacji gościa.</summary>
    public string? UserId { get; set; }

    public required string CustomerName { get; set; }
    public required string CustomerSurname { get; set; }
    public required string CustomerEmail { get; set; }
    public string? CustomerPhone { get; set; }

    public decimal TotalPrice { get; set; }
    public decimal ServiceFee { get; set; }
    public string PaymentMethod { get; set; } = "";
    public BookingStatus Status { get; set; } = BookingStatus.Confirmed;
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<BookingSeat> Seats { get; set; } = [];
}
