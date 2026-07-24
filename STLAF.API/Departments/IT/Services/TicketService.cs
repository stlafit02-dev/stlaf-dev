using Microsoft.EntityFrameworkCore;
using STLAF.API.Data;
using STLAF.API.DTOs.Ticket;
using STLAF.API.Enums;
using STLAF.API.Interfaces.Services;
using STLAF.API.Models;
using STLAF.API.Common;
using AutoMapper;

namespace STLAF.API.Services;

public class TicketService : ITicketService
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;
    private readonly ILogger<TicketService> _logger;

    public TicketService(
    ApplicationDbContext context,
    IMapper mapper,
    ILogger<TicketService> logger)
    {
        _context = context;
        _mapper = mapper;
        _logger = logger;
    }

    public async Task<TicketDto> CreateAsync(CreateTicketDto dto)
    {
        var ticket = _mapper.Map<Ticket>(dto);

        ticket.TicketId = Guid.NewGuid();
        ticket.Status = TicketStatus.Open;
        ticket.DateSubmitted = DateTime.UtcNow;
        ticket.UpdatedDate = DateTime.UtcNow;

        // ticket number generation
        var year = DateTime.UtcNow.Year;

        var lastTicket = await _context.Tickets
            .Where(t => t.TicketNumber.StartsWith($"TKT-{year}"))
            .OrderByDescending(t => t.TicketNumber)
            .FirstOrDefaultAsync();

        var nextNumber = 1;

        if (lastTicket != null)
        {
            var lastNumber = lastTicket.TicketNumber
                .Split('-')
                .Last();

            nextNumber = int.Parse(lastNumber) + 1;
        }

        ticket.TicketNumber = $"TKT-{year}-{nextNumber:D2}";

        _context.Tickets.Add(ticket);

        await _context.SaveChangesAsync();

        return _mapper.Map<TicketDto>(ticket);
    }

    public async Task<PaginatedResult<TicketDto>> GetAllAsync(TicketQueryDto query)
    {
        IQueryable<Ticket> tickets = _context.Tickets
            .Include(t => t.AssignedUser);

        // Search
        if (!string.IsNullOrWhiteSpace(query.Search))
        {
            var search = query.Search.Trim();

            tickets = tickets.Where(t =>
                t.Name.Contains(search) ||
                t.CompanyEmail.Contains(search) ||
                t.Description.Contains(search));
        }

        // Status Filter
        if (query.Status.HasValue)
        {
            tickets = tickets.Where(t => t.Status == query.Status.Value);
        }

        // Priority Filter
        if (query.Priority.HasValue)
        {
            tickets = tickets.Where(t => t.Priority == query.Priority.Value);
        }

        // Assigned User Filter
        if (query.AssignedTo.HasValue)
        {
            tickets = tickets.Where(t => t.AssignedTo == query.AssignedTo.Value);
        }

        // Sorting
        tickets = query.SortBy.ToLower() switch
        {
            "priority" => query.Descending
                ? tickets.OrderByDescending(t => t.Priority)
                : tickets.OrderBy(t => t.Priority),

            "status" => query.Descending
                ? tickets.OrderByDescending(t => t.Status)
                : tickets.OrderBy(t => t.Status),

            "name" => query.Descending
                ? tickets.OrderByDescending(t => t.Name)
                : tickets.OrderBy(t => t.Name),

            _ => query.Descending
                ? tickets.OrderByDescending(t => t.DateSubmitted)
                : tickets.OrderBy(t => t.DateSubmitted)
        };

        var totalRecords = await tickets.CountAsync();

        var items = await tickets
            .Skip((query.Page - 1) * query.PageSize)
            .Take(query.PageSize)
            .ToListAsync();

        return new PaginatedResult<TicketDto>
        {
            Data = _mapper.Map<List<TicketDto>>(items),
            TotalRecords = totalRecords,
            CurrentPage = query.Page,
            PageSize = query.PageSize,
            TotalPages = (int)Math.Ceiling(totalRecords / (double)query.PageSize)
        };
    }

    public async Task<TicketDto?> GetByIdAsync(Guid id)
    {
        var ticket = await _context.Tickets
            .Include(t => t.AssignedUser)
            .FirstOrDefaultAsync(t => t.TicketId == id);

        if (ticket == null)
            return null;

        return _mapper.Map<TicketDto>(ticket);
    }

    public async Task<TicketDto> UpdateAsync(Guid id, UpdateTicketDto dto)
    {
        var ticket = await _context.Tickets.FindAsync(id);

        if (ticket == null)
            throw new Exception("Ticket not found.");

        // Prevent editing closed tickets
        if (ticket.Status == TicketStatus.Closed)
            throw new Exception("This ticket has already been closed and cannot be edited.");

        ticket.Status = dto.Status;
        ticket.AssignedTo = dto.AssignedTo;
        ticket.UpdatedDate = DateTime.UtcNow;

        await _context.SaveChangesAsync();

        return await GetByIdAsync(id)
            ?? throw new Exception("Ticket not found.");
    }

    public async Task AssignAsync(Guid ticketId, Guid userId)
    {
        var ticket = await _context.Tickets.FindAsync(ticketId);

        if (ticket == null)
            throw new Exception("Ticket not found.");

        var user = await _context.Users.FindAsync(userId);

        if (user == null)
            throw new Exception("Assigned user not found.");

        ticket.AssignedTo = user.UserId;
        ticket.UpdatedDate = DateTime.UtcNow;

        await _context.SaveChangesAsync();
    }
    public async Task DeleteAsync(Guid id)
    {
        var ticket = await _context.Tickets.FindAsync(id);

        if (ticket == null)
            throw new Exception("Ticket not found.");

        _context.Tickets.Remove(ticket);

        await _context.SaveChangesAsync();
    }

    public async Task<TicketDashboardDto> GetDashboardAsync()
    {
        return new TicketDashboardDto
        {
            TotalTickets = await _context.Tickets.CountAsync(),

            OpenTickets = await _context.Tickets.CountAsync(t => t.Status == TicketStatus.Open),

            InProgressTickets = await _context.Tickets.CountAsync(t => t.Status == TicketStatus.InProgress),

            OnHoldTickets = await _context.Tickets.CountAsync(t => t.Status == TicketStatus.OnHold),

            ResolvedTickets = await _context.Tickets.CountAsync(t => t.Status == TicketStatus.Resolved),

            ClosedTickets = await _context.Tickets.CountAsync(t => t.Status == TicketStatus.Closed),

            UrgentTickets = await _context.Tickets.CountAsync(t => t.Priority == TicketPriority.Urgent),

            MediumTickets = await _context.Tickets.CountAsync(t => t.Priority == TicketPriority.Medium),

            LowTickets = await _context.Tickets.CountAsync(t => t.Priority == TicketPriority.Low)
        };
    }
    public ICollection<TicketHistory> Histories { get; set; }
    = new List<TicketHistory>();

    public async Task<List<TicketHistoryDto>> GetHistoryAsync(Guid ticketId)
    {
        var history = await _context.TicketHistories
            .Include(h => h.User)
            .Where(h => h.TicketId == ticketId)
            .OrderByDescending(h => h.CreatedAt)
            .ToListAsync();

        return _mapper.Map<List<TicketHistoryDto>>(history);
    }
    public ICollection<TicketComment> Comments { get; set; }
        = new List<TicketComment>();
    public async Task<TicketCommentDto> AddCommentAsync(Guid ticketId, CreateCommentDto dto)
    {
        var ticket = await _context.Tickets.FindAsync(ticketId);

        if (ticket == null)
            throw new Exception("Ticket not found.");

        var comment = new TicketComment
        {
            CommentId = Guid.NewGuid(),
            TicketId = ticketId,
            Message = dto.Message,
            IsInternal = dto.IsInternal,
            AuthorName = "IT Admin",
            CreatedAt = DateTime.UtcNow
        };

        _context.TicketComments.Add(comment);

        await _context.SaveChangesAsync();

        return _mapper.Map<TicketCommentDto>(comment);
    }
    public async Task<List<TicketCommentDto>> GetCommentsAsync(Guid ticketId)
    {
        var comments = await _context.TicketComments
            .Where(c => c.TicketId == ticketId)
            .OrderBy(c => c.CreatedAt)
            .ToListAsync();

        return _mapper.Map<List<TicketCommentDto>>(comments);
    }
    public async Task<List<PublicTicketDto>> GetPublicTicketsAsync()
    {
        return await _context.Tickets
            .OrderByDescending(t => t.DateSubmitted)
            .Select(t => new PublicTicketDto
            {
                TicketNumber = t.TicketNumber,
                Department = t.Department.ToString(),
                Description = t.Description,
                Status = t.Status.ToString(),
                Priority = t.Priority.ToString(),
                DateSubmitted = t.DateSubmitted
            })
            .ToListAsync();
    }
}