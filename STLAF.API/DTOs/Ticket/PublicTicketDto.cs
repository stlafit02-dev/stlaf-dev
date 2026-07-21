namespace STLAF.API.DTOs.Ticket;

public class PublicTicketDto
{
    public string TicketNumber { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;
    public string Department { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;

    public string Priority { get; set; } = string.Empty;

    public DateTime DateSubmitted { get; set; }
}