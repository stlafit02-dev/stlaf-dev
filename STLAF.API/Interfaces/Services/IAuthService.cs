using STLAF.API.DTOs.Auth;

namespace STLAF.API.Interfaces.Services;

public interface IAuthService
{
    Task<LoginResponseDto> LoginAsync(LoginRequestDto dto);
}