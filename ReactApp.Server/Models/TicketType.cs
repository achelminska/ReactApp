namespace ReactApp.Server.Models;

public class TicketType
{
    public int Id { get; set; }
    public required string Name { get; set; }
    public decimal Price { get; set; }
}
