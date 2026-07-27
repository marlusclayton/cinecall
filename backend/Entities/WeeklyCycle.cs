namespace CineCall.Backend.Entities;

public enum CycleStatus
{
    Nominating,
    SummarySent,
    PollActive,
    TieBreakerActive,
    Completed
}

public class WeeklyCycle
{
    public int Id { get; set; }
    public int CategoryId { get; set; }
    public Category Category { get; set; } = null!;
    
    public CycleStatus Status { get; set; } = CycleStatus.Nominating;
    public DateTime StartedAt { get; set; } = DateTime.UtcNow;
    public int? WinnerMovieId { get; set; }

    public ICollection<Nomination> Nominations { get; set; } = new List<Nomination>();
    public ICollection<Poll> Polls { get; set; } = new List<Poll>();
}
