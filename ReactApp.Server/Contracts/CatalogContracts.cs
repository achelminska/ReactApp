using System.ComponentModel.DataAnnotations;

namespace ReactApp.Server.Contracts;

public record MovieDto(
    int Id,
    string Title,
    string? Description,
    string PosterUrl,
    int DurationMinutes,
    string Tags,
    bool IsCurrentlyShowing,
    bool IsUpcoming,
    bool IsFamilyFriendly);

public record MovieUpsertRequest(
    [Required] string Title,
    string? Description,
    [Required] string PosterUrl,
    int DurationMinutes,
    string Tags,
    bool IsCurrentlyShowing,
    bool IsUpcoming,
    bool IsFamilyFriendly);

public record CinemaDto(int Id, string City, string Name, IEnumerable<HallDto> Halls);

public record HallDto(int Id, string Name);

public record ShowtimeDto(
    int Id,
    DateTime StartsAt,
    MovieDto Movie,
    string HallName,
    string City);

public record RepertoireMovieDto(
    int MovieId,
    string Title,
    string PosterUrl,
    string Tags,
    IEnumerable<RepertoireShowtimeDto> Showtimes);

public record RepertoireShowtimeDto(int ShowtimeId, string Time);

public record ShowtimeDetailsDto(
    int Id,
    DateTime StartsAt,
    string MovieTitle,
    string City,
    string HallName,
    object Layout,
    IEnumerable<string> OccupiedSeats);

public record ShowtimeUpsertRequest(
    [Required] int MovieId,
    [Required] int HallId,
    [Required] DateTime StartsAt);

public record TicketTypeDto(int Id, string Name, decimal Price);
