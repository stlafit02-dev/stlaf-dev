using Microsoft.EntityFrameworkCore;
using STLAF.API.Models;
using STLAF.API.Common;

namespace STLAF.API.Data;

public static class DbInitializer
{
    public static async Task SeedAsync(ApplicationDbContext context)
    {
        await context.Database.MigrateAsync();

        if (await context.Users.AnyAsync())
            return;
        var passwordHash = BCrypt.Net.BCrypt.HashPassword("Admin@123");
        var admin = new User
        {
            FirstName = "Admin",
            LastName = "User",
            Email = "admin@stlaf.com",
            PasswordHash = passwordHash,

            Department = "IT",
            OfficePosition = OfficePositions.ITSupportSpecialist,

            IsActive = true,
            CreatedDate = DateTime.UtcNow
        };

        context.Users.Add(admin);

        await context.SaveChangesAsync();
    }
}