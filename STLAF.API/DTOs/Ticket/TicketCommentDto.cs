namespace STLAF.API.DTOs.Ticket;

public class TicketCommentDto
{
    public Guid CommentId { get; set; }

    public string AuthorName { get; set; } = string.Empty;

    public string Message { get; set; } = string.Empty;

    public bool IsInternal { get; set; }

    public DateTime CreatedAt { get; set; }
}