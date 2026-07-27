namespace CineCall.Backend.Entities;

public class Poll
{
    public int Id { get; set; }
    public int CycleId { get; set; }
    public WeeklyCycle Cycle { get; set; } = null!;

    public string WahaPollId { get; set; } = string.Empty;
    public bool IsTieBreaker { get; set; } = false;
    public DateTime EndsAt { get; set; }
    public bool IsClosed { get; set; } = false;
}
