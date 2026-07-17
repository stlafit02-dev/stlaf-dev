using System.ComponentModel.DataAnnotations;

namespace STLAF.API.DTOs.Ticket;

public class CreateCommentDto
{
    [Required]
    [MaxLength(1000)]
    public string Message { get; set; } = string.Empty;

    public bool IsInternal { get; set; } = false;
}