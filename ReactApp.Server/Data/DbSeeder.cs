using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using ReactApp.Server.Models;

namespace ReactApp.Server.Data;

public static class DbSeeder
{
    public const string AdminRole = "Admin";
    public const string UserRole = "User";

    public static async Task SeedAsync(IServiceProvider services)
    {
        var db = services.GetRequiredService<CinemaDbContext>();
        await db.Database.MigrateAsync();

        await SeedRolesAndAdminAsync(services);
        await SeedCatalogAsync(db);
        await EnsureShowtimesAsync(db);
    }

    private static async Task SeedRolesAndAdminAsync(IServiceProvider services)
    {
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
        var config = services.GetRequiredService<IConfiguration>();

        foreach (var role in new[] { AdminRole, UserRole })
        {
            if (!await roleManager.RoleExistsAsync(role))
                await roleManager.CreateAsync(new IdentityRole(role));
        }

        var adminEmail = config["Seed:AdminEmail"] ?? "admin@cinemabox.pl";
        var adminPassword = config["Seed:AdminPassword"];
        if (string.IsNullOrWhiteSpace(adminPassword))
            return; // brak hasła w konfiguracji = nie tworzymy konta admina

        if (await userManager.FindByEmailAsync(adminEmail) is null)
        {
            var admin = new ApplicationUser
            {
                UserName = adminEmail,
                Email = adminEmail,
                EmailConfirmed = true
            };
            var result = await userManager.CreateAsync(admin, adminPassword);
            if (result.Succeeded)
                await userManager.AddToRoleAsync(admin, AdminRole);
        }
    }

    private static async Task SeedCatalogAsync(CinemaDbContext db)
    {
        if (!await db.TicketTypes.AnyAsync())
        {
            db.TicketTypes.AddRange(SeedData.TicketTypes.Select(t => new TicketType
            {
                Name = t.Name,
                Price = t.Price
            }));
        }

        if (!await db.Movies.AnyAsync())
        {
            db.Movies.AddRange(SeedData.Movies.Select(m => new Movie
            {
                Title = m.Title,
                PosterUrl = m.Poster,
                IsCurrentlyShowing = m.Now,
                IsUpcoming = m.Upcoming,
                IsFamilyFriendly = m.Family,
                Description = $"Zapraszamy na seans filmu \"{m.Title}\" w kinach CinemaBox."
            }));
        }

        if (!await db.Cinemas.AnyAsync())
        {
            foreach (var city in SeedData.Cities)
            {
                var cinema = new Cinema { City = city, Name = $"CinemaBox {city}" };
                for (var i = 1; i <= 3; i++)
                {
                    cinema.Halls.Add(new Hall
                    {
                        Name = $"Sala {i}",
                        LayoutJson = SeedData.DefaultHallLayoutJson
                    });
                }
                db.Cinemas.Add(cinema);
            }
        }

        await db.SaveChangesAsync();
    }

    /// <summary>
    /// Generuje deterministyczny repertuar na najbliższe 14 dni dla dni, które go jeszcze nie mają.
    /// </summary>
    public static async Task EnsureShowtimesAsync(CinemaDbContext db)
    {
        var nowShowing = await db.Movies
            .Where(m => m.IsCurrentlyShowing || m.IsFamilyFriendly)
            .OrderBy(m => m.Id)
            .ToListAsync();
        if (nowShowing.Count == 0) return;

        var cinemas = await db.Cinemas.Include(c => c.Halls).OrderBy(c => c.Id).ToListAsync();
        var today = DateTime.Today;

        for (var dayOffset = 0; dayOffset < 14; dayOffset++)
        {
            var date = today.AddDays(dayOffset);
            var hasAny = await db.Showtimes.AnyAsync(s => s.StartsAt >= date && s.StartsAt < date.AddDays(1));
            if (hasAny) continue;

            foreach (var cinema in cinemas)
            {
                // Deterministyczny "los" per kino i dzień — repertuar jest stabilny między restartami.
                var rng = new Random(cinema.Id * 1000 + date.DayOfYear);
                var movieCount = rng.Next(6, 9);
                var picked = nowShowing.OrderBy(_ => rng.Next()).Take(movieCount).ToList();

                foreach (var movie in picked)
                {
                    var hall = cinema.Halls.ElementAt(rng.Next(cinema.Halls.Count));
                    var showCount = rng.Next(2, 5);
                    var startHour = rng.Next(10, 14);
                    for (var i = 0; i < showCount; i++)
                    {
                        var hour = startHour + i * rng.Next(2, 4);
                        if (hour > 22) break;
                        db.Showtimes.Add(new Showtime
                        {
                            MovieId = movie.Id,
                            HallId = hall.Id,
                            StartsAt = date.AddHours(hour).AddMinutes(rng.Next(2) == 0 ? 0 : 30)
                        });
                    }
                }
            }
        }

        await db.SaveChangesAsync();
    }
}
