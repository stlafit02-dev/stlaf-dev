using System.ComponentModel.DataAnnotations;

namespace STLAF.API.Models;

public class TicketComment
{
    [Key]
    public Guid CommentId { get; set; }

    public Guid TicketId { get; set; }

    public Ticket Ticket { get; set; } = null!;

    // Null means the comment came from the public employee form
    public Guid? UserId { get; set; }

    public User? User { get; set; }

    public string AuthorName { get; set; } = string.Empty;

    public string Message { get; set; } = string.Empty;

    public bool IsInternal { get; set; } = false;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}