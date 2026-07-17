using System.ComponentModel.DataAnnotations;

namespace STLAF.API.Models;

public class TicketHistory
{
    [Key]
    public Guid HistoryId { get; set; }

    public Guid TicketId { get; set; }

    public Ticket Ticket { get; set; } = null!;

    public string Action { get; set; } = string.Empty;

    public string? OldValue { get; set; }

    public string? NewValue { get; set; }

    public Guid? PerformedBy { get; set; }

    public User? User { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}