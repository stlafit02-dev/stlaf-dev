using Microsoft.AspNetCore.Mvc;
using STLAF.API.Enums;

namespace STLAF.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class EnumsController : ControllerBase
{
    [HttpGet("categories")]
    public IActionResult GetCategories()
    {
        var categories = Enum.GetNames(typeof(TicketCategory));

        return Ok(categories);
    }

    [HttpGet("priorities")]
    public IActionResult GetPriorities()
    {
        var priorities = Enum.GetNames(typeof(TicketPriority));

        return Ok(priorities);
    }

    [HttpGet("statuses")]
    public IActionResult GetStatuses()
    {
        var statuses = Enum.GetNames(typeof(TicketStatus));

        return Ok(statuses);
    }
}