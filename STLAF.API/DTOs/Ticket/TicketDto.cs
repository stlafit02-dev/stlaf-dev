using STLAF.API.Enums;

namespace STLAF.API.DTOs.Ticket;

public class TicketDto
{
    public Guid TicketId { get; set; }

    public string TicketNumber { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string CompanyEmail { get; set; } = string.Empty;

    public string ViberNumber { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public TicketCategory Category { get; set; }

    public TicketPriority Priority { get; set; }

    public TicketStatus Status { get; set; }

    public Guid? AssignedToId { get; set; }

    public string? AssignedTo { get; set; }

    public DateTime DateSubmitted { get; set; }
}