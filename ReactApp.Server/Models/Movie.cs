namespace ReactApp.Server.Models;

public class Movie
{
    public int Id { get; set; }
    public required string Title { get; set; }
    public string? Description { get; set; }
    public required string PosterUrl { get; set; }
    public int DurationMinutes { get; set; } = 120;
    public string Tags { get; set; } = "2D | PL (napisy)";
    public bool IsCurrentlyShowing { get; set; }
    public bool IsUpcoming { get; set; }
    public bool IsFamilyFriendly { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Showtime> Showtimes { get; set; } = [];
}
