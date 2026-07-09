namespace ReactApp.Server.Models;

public class Cinema
{
    public int Id { get; set; }
    public required string City { get; set; }
    public required string Name { get; set; }

    public ICollection<Hall> Halls { get; set; } = [];
}
