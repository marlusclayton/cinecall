namespace CineCall.Backend.Entities;

public class Nomination
{
    public int Id { get; set; }
    public int CycleId { get; set; }
    public WeeklyCycle Cycle { get; set; } = null!;

    public string Title { get; set; } = string.Empty;
    public string IndicatedBy { get; set; } = string.Empty;
    public string Overview { get; set; } = string.Empty;
    public int? TmdbId { get; set; }
    public string? PosterPath { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}
