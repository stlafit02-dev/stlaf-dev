using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using STLAF.API.DTOs.Ticket;
using STLAF.API.Interfaces.Services;
using STLAF.API.Common;

namespace STLAF.API.Departments.IT.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TicketController : ControllerBase
{
    private readonly ITicketService _ticketService;

    public TicketController(ITicketService ticketService)
    {
        _ticketService = ticketService;
    }

    [AllowAnonymous]
    [HttpPost]
    public async Task<IActionResult> Create(CreateTicketDto dto)
    {

        var ticket = await _ticketService.CreateAsync(dto);
        return CreatedAtAction(
    nameof(GetById),
    new { id = ticket.TicketId },
    new ApiResponse<TicketDto>(
        true,
        "Ticket created successfully.",
        ticket));
    }
    [AllowAnonymous]
    [HttpGet("public")]
    public async Task<IActionResult> GetPublicTickets()
    {
        var tickets = await _ticketService.GetPublicTicketsAsync();

        return Ok(new ApiResponse<List<PublicTicketDto>>(
            true,
            "Public tickets retrieved successfully.",
            tickets));
    }
    [Authorize]
    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] TicketQueryDto query)
    {
        var result = await _ticketService.GetAllAsync(query);

        return Ok(new ApiResponse<PaginatedResult<TicketDto>>(
    true,
    "Tickets retrieved successfully.",
    result));
    }

    [Authorize]
    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var ticket = await _ticketService.GetByIdAsync(id);

        if (ticket == null)
        {
            return NotFound(new ApiResponse<object>(
                false,
                "Ticket not found.",
                null));
        }

        return Ok(new ApiResponse<TicketDto>(
            true,
            "Ticket retrieved successfully.",
            ticket));
    }

    [Authorize]
    [HttpPut("{id:guid}")]
    public async Task<IActionResult> Update(Guid id, UpdateTicketDto dto)
    {
        var ticket = await _ticketService.UpdateAsync(id, dto);

        return Ok(new ApiResponse<TicketDto>(
            true,
            "Ticket updated successfully.",
            ticket));
    }

    [Authorize]
    [HttpPatch("{id:guid}/assign")]
    public async Task<IActionResult> Assign(Guid id, AssignTicketDto dto)
    {
        await _ticketService.AssignAsync(id, dto.AssignedTo);
        return Ok(new ApiResponse<object>(
    true,
    "Ticket assigned successfully.",
    null));
    }

    [Authorize]
    [HttpDelete("{id:guid}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        await _ticketService.DeleteAsync(id);
        return Ok(new ApiResponse<object>(
    true,
    "Ticket deleted successfully.",
    null));
    }
    [AllowAnonymous]
    [HttpGet("dashboard")]
    public async Task<IActionResult> Dashboard()
    {
        var dashboard = await _ticketService.GetDashboardAsync();

        return Ok(new ApiResponse<TicketDashboardDto>(
            true,
            "Dashboard loaded successfully.",
            dashboard));
    }
    [Authorize]
    [HttpGet("{id:guid}/history")]
    public async Task<IActionResult> GetHistory(Guid id)
    {
        var history = await _ticketService.GetHistoryAsync(id);

        return Ok(new ApiResponse<List<TicketHistoryDto>>(
    true,
    "Ticket history retrieved successfully.",
    history));
    }
    [Authorize]
    [HttpGet("{id:guid}/comments")]
    public async Task<IActionResult> GetComments(Guid id)
    {
        var comments = await _ticketService.GetCommentsAsync(id);

        return Ok(new ApiResponse<List<TicketCommentDto>>(
    true,
    "Comments retrieved successfully.",
    comments));
    }
    [Authorize]
    [HttpPost("{id:guid}/comments")]
    public async Task<IActionResult> AddComment(
    Guid id,
    CreateCommentDto dto)
    {
        var comment = await _ticketService.AddCommentAsync(id, dto);

        return Ok(new ApiResponse<TicketCommentDto>(
    true,
    "Comment added successfully.",
    comment));
    }

}