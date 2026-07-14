using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using ReactApp.Server.Models;

namespace ReactApp.Server.Data;

public class CinemaDbContext(DbContextOptions<CinemaDbContext> options)
    : IdentityDbContext<ApplicationUser>(options)
{
    public DbSet<Movie> Movies => Set<Movie>();
    public DbSet<Cinema> Cinemas => Set<Cinema>();
    public DbSet<Hall> Halls => Set<Hall>();
    public DbSet<Showtime> Showtimes => Set<Showtime>();
    public DbSet<TicketType> TicketTypes => Set<TicketType>();
    public DbSet<Booking> Bookings => Set<Booking>();
    public DbSet<BookingSeat> BookingSeats => Set<BookingSeat>();
    public DbSet<ContactMessage> ContactMessages => Set<ContactMessage>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Movie>().HasIndex(m => m.Title);
        builder.Entity<Cinema>().HasIndex(c => c.City);
        builder.Entity<Showtime>().HasIndex(s => s.StartsAt);

        builder.Entity<Booking>()
            .HasMany(b => b.Seats)
            .WithOne(s => s.Booking)
            .HasForeignKey(s => s.BookingId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Booking>().Property(b => b.TotalPrice).HasPrecision(10, 2);
        builder.Entity<Booking>().Property(b => b.ServiceFee).HasPrecision(10, 2);
        builder.Entity<BookingSeat>().Property(s => s.Price).HasPrecision(10, 2);
        builder.Entity<TicketType>().Property(t => t.Price).HasPrecision(10, 2);

        // Jeden aktywny rekord na (seans, rząd, miejsce) — ostatnia linia obrony przy race condition
        builder.Entity<BookingSeat>()
            .HasIndex(s => new { s.ShowtimeId, s.Row, s.SeatNumber })
            .IsUnique();
    }
}
