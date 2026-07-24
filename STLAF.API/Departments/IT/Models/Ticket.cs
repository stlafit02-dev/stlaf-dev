using STLAF.API.Enums;
using STLAF.API.Models;
public class Ticket
{
    public Guid TicketId { get; set; }

    public string TicketNumber { get; set; } = string.Empty;

    public string Name { get; set; } = string.Empty;

    public string CompanyEmail { get; set; } = string.Empty;

    public string ViberNumber { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public TicketCategory Category { get; set; }

    public TicketPriority Priority { get; set; }

    public TicketStatus Status { get; set; } = TicketStatus.Open;

    public Department Department { get; set; }

    public Guid? AssignedTo { get; set; }

    public User? AssignedUser { get; set; }

    public DateTime DateSubmitted { get; set; } = DateTime.UtcNow;

    public DateTime UpdatedDate { get; set; } = DateTime.UtcNow;
}