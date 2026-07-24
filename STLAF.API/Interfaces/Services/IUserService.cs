using STLAF.API.DTOs.User;

namespace STLAF.API.Interfaces.Services;

public interface IUserService
{
    Task<List<UserDto>> GetAllAsync();
    Task<UserDto?> GetByIdAsync(Guid userId);
}