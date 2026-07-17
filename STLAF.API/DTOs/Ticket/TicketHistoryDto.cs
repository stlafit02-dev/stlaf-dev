public class TicketHistoryDto
{
    public Guid HistoryId { get; set; }

    public string Action { get; set; } = string.Empty;

    public string? OldValue { get; set; }

    public string? NewValue { get; set; }

    public string? PerformedBy { get; set; }

    public DateTime CreatedAt { get; set; }
}