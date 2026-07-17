using STLAF.API.Models;

namespace STLAF.API.Interfaces.Repositories;

public interface ITicketRepository
{
    Task AddAsync(Ticket ticket);

    Task<Ticket?> GetByIdAsync(Guid id);

    Task<List<Ticket>> GetAllAsync();

    Task UpdateAsync(Ticket ticket);

    Task DeleteAsync(Ticket ticket);

    Task SaveChangesAsync();
}