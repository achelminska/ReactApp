namespace ReactApp.Server.Models;

public class Hall
{
    public int Id { get; set; }
    public int CinemaId { get; set; }
    public Cinema Cinema { get; set; } = null!;
    public required string Name { get; set; }

    /// <summary>
    /// Układ miejsc jako JSON: tablica rzędów, każdy rząd to tablica numerów miejsc lub null (przerwa).
    /// </summary>
    public required string LayoutJson { get; set; }

    public ICollection<Showtime> Showtimes { get; set; } = [];
}
