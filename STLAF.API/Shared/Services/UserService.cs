using AutoMapper;
using Microsoft.EntityFrameworkCore;
using STLAF.API.DTOs.User;
using STLAF.API.Interfaces.Services;
using STLAF.API.Data;

namespace STLAF.API.Services;

public class UserService : IUserService
{
    private readonly ApplicationDbContext _context;
    private readonly IMapper _mapper;

    public UserService(
        ApplicationDbContext context,
        IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }



    public async Task<List<UserDto>> GetAllAsync()
    {
        var users = await _context.Users.ToListAsync();
        return _mapper.Map<List<UserDto>>(users);
    }

    public async Task<UserDto?> GetByIdAsync(Guid userId)
    {
        var user = await _context.Users.FindAsync(userId);
        if (user == null) return null;
        return _mapper.Map<UserDto>(user);
    }

}