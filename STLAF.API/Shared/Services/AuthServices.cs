using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using STLAF.API.Configurations;
using STLAF.API.Data;
using STLAF.API.DTOs.Auth;
using STLAF.API.Interfaces.Services;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace STLAF.API.Services;

public class AuthService : IAuthService
{
    private readonly ApplicationDbContext _context;
    private readonly JwtSettings _jwtSettings;

    public AuthService(
        ApplicationDbContext context,
        IOptions<JwtSettings> jwtOptions)
    {
        _context = context;
        _jwtSettings = jwtOptions.Value;
    }

    public async Task<LoginResponseDto> LoginAsync(LoginRequestDto dto)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(x => x.Email == dto.Email);

        if (user == null)
            throw new Exception("Invalid email or password.");

        if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
            throw new Exception("Invalid email or password.");

        var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),

            // Optional but recommended
            new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}"),


            new Claim(ClaimTypes.Role, user.Role.ToString()),

            // Optional - useful for filtering and auditing
            new Claim("Department", user.Department)
        };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_jwtSettings.Key));

        var credentials = new SigningCredentials(
            key,
            SecurityAlgorithms.HmacSha256);

        var expiration = DateTime.UtcNow.AddMinutes(
            _jwtSettings.DurationInMinutes);

        var token = new JwtSecurityToken(
            issuer: _jwtSettings.Issuer,
            audience: _jwtSettings.Audience,
            claims: claims,
            expires: expiration,
            signingCredentials: credentials);

        return new LoginResponseDto
        {
            Token = new JwtSecurityTokenHandler().WriteToken(token),
            Expiration = expiration
        };
    }
}