using STLAF.API.Enums;

namespace STLAF.API.DTOs.Ticket;

public class UpdateTicketDto
{
    public TicketStatus Status { get; set; }

    public Guid? AssignedTo { get; set; }
}