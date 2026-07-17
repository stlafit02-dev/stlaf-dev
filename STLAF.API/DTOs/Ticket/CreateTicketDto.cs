using STLAF.API.Enums;
using System.ComponentModel.DataAnnotations;

namespace STLAF.API.DTOs.Ticket;

public class CreateTicketDto
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set;} = string.Empty;
    [Required]
    [EmailAddress]
    public string CompanyEmail { get; set; } = string.Empty;
    [Required]
    [Phone]
    public string ViberNumber { get; set;} = string.Empty;
    public TicketCategory Category { get; set; }
    [Required]
    [MaxLength(1000)]
    public string Description { get; set;} = string.Empty;
    [Required]
    public TicketPriority Priority { get; set; }
}