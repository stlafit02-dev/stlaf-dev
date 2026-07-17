using STLAF.API.Enums;

namespace STLAF.API.DTOs.Ticket;

public class TicketQueryDto
{
    public string? Search { get; set; }

    public TicketStatus? Status { get; set; }

    public TicketPriority? Priority { get; set; }

    public Guid? AssignedTo { get; set; }

    public int Page { get; set; } = 1;

    public int PageSize { get; set; } = 10;

    public string SortBy { get; set; } = "DateSubmitted";

    public bool Descending { get; set; } = true;
}