namespace ReactApp.Server.Models;

public class BookingSeat
{
    public int Id { get; set; }
    public int BookingId { get; set; }
    public Booking Booking { get; set; } = null!;

    /// <summary>Denormalizacja z Bookings.ShowtimeId — unikalny indeks chroni przed podwójną rezerwacją.</summary>
    public int ShowtimeId { get; set; }

    public int Row { get; set; }
    public int SeatNumber { get; set; }

    public int TicketTypeId { get; set; }
    public TicketType TicketType { get; set; } = null!;
    public decimal Price { get; set; }
}
