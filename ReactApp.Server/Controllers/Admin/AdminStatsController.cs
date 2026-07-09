using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactApp.Server.Data;
using ReactApp.Server.Models;

namespace ReactApp.Server.Controllers.Admin;

[ApiController]
[Route("api/admin/stats")]
[Authorize(Roles = DbSeeder.AdminRole)]
public class AdminStatsController(CinemaDbContext db, UserManager<ApplicationUser> userManager) : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult> GetStats()
    {
        var confirmed = db.Bookings.AsNoTracking()
            .Where(b => b.Status != BookingStatus.Cancelled);

        var totalRevenue = await confirmed.SumAsync(b => (decimal?)b.TotalPrice) ?? 0;
        var totalBookings = await confirmed.CountAsync();
        var totalTickets = await db.BookingSeats.AsNoTracking()
            .CountAsync(s => s.Booking.Status != BookingStatus.Cancelled);
        var totalUsers = await userManager.Users.CountAsync();
        var totalMovies = await db.Movies.CountAsync();
        var unreadMessages = await db.ContactMessages.CountAsync(m => !m.IsRead);

        var topMovies = await db.BookingSeats.AsNoTracking()
            .Where(s => s.Booking.Status != BookingStatus.Cancelled)
            .GroupBy(s => s.Booking.Showtime.Movie.Title)
            .Select(g => new { title = g.Key, tickets = g.Count(), revenue = g.Sum(s => s.Price) })
            .OrderByDescending(x => x.tickets)
            .Take(5)
            .ToListAsync();

        var since = DateTime.Today.AddDays(-13);
        var recentRaw = await confirmed
            .Where(b => b.CreatedAt >= since)
            .GroupBy(b => b.CreatedAt.Date)
            .Select(g => new { date = g.Key, count = g.Count(), revenue = g.Sum(b => b.TotalPrice) })
            .ToListAsync();

        var bookingsPerDay = Enumerable.Range(0, 14)
            .Select(i => since.AddDays(i))
            .Select(d =>
            {
                var entry = recentRaw.FirstOrDefault(r => r.date == d);
                return new
                {
                    date = d.ToString("yyyy-MM-dd"),
                    count = entry?.count ?? 0,
                    revenue = entry?.revenue ?? 0
                };
            });

        return Ok(new
        {
            totalRevenue,
            totalBookings,
            totalTickets,
            totalUsers,
            totalMovies,
            unreadMessages,
            topMovies,
            bookingsPerDay
        });
    }
}
