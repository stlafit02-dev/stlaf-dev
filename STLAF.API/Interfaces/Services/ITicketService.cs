using STLAF.API.Common;
using STLAF.API.DTOs.Ticket;

namespace STLAF.API.Interfaces.Services;

public interface ITicketService
{
    Task<TicketDto> CreateAsync(CreateTicketDto dto);

    Task<PaginatedResult<TicketDto>> GetAllAsync(TicketQueryDto query);

    Task<TicketDto?> GetByIdAsync(Guid id);

    Task<TicketDto> UpdateAsync(Guid id, UpdateTicketDto dto);

    Task AssignAsync(Guid ticketId, Guid userId);

    Task DeleteAsync(Guid id);

    Task<TicketDashboardDto> GetDashboardAsync();
    Task<List<TicketHistoryDto>> GetHistoryAsync(Guid ticketId);
    Task<TicketCommentDto> AddCommentAsync(Guid ticketId, CreateCommentDto dto);
    Task<List<TicketCommentDto>> GetCommentsAsync(Guid ticketId);
}