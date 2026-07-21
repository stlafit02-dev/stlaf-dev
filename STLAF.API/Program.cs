using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Npgsql;
using STLAF.API.Configurations;
using STLAF.API.Data;
using STLAF.API.Interfaces.Repositories;
using STLAF.API.Interfaces.Services;
using STLAF.API.Mappings;
using STLAF.API.Middleware;
using STLAF.API.Repositories;
using STLAF.API.Services;
using System.Text;
using System.Text.Json.Serialization;

try
{
    var builder = WebApplication.CreateBuilder(args);

    // Load .env if it exists locally
    if (builder.Environment.IsDevelopment() && File.Exists(".env"))
    {
        DotNetEnv.Env.Load();
    }

    // AutoMapper
    builder.Services.AddAutoMapper(typeof(MappingProfile));

    // Services
    builder.Services.AddScoped<IAuthService, AuthService>();
    builder.Services.AddScoped<ITicketService, TicketService>();
    builder.Services.AddScoped<IUserService, UserService>();

    // Repositories
    builder.Services.AddScoped<ITicketRepository, TicketRepository>();

    // Controllers
    builder.Services
        .AddControllers()
        .AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.Converters.Add(
                new JsonStringEnumConverter());
        });

    // CORS
    var allowedOrigins = builder.Configuration
        .GetSection("AllowedOrigins")
        .Get<string[]>() ?? Array.Empty<string>();

    builder.Services.AddCors(options =>
    {
        options.AddPolicy("Frontend", policy =>
        {
            policy
                .WithOrigins(allowedOrigins)
                .AllowAnyHeader()
                .AllowAnyMethod();
        });
    });

    // Swagger
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen();

    // Database Connection String Logic
    string rawConnectionString = Environment.GetEnvironmentVariable("DATABASE_URL")
        ?? builder.Configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException("Database connection string was not found.");

    string formattedConnectionString = FormatNpgsqlConnectionString(rawConnectionString);

    builder.Services.AddDbContext<ApplicationDbContext>(options =>
    {
        options.UseNpgsql(formattedConnectionString);
    });

    // JWT Configuration
    builder.Services.Configure<JwtSettings>(
        builder.Configuration.GetSection("Jwt"));

    var jwt = builder.Configuration.GetSection("Jwt");
    var jwtKey = Environment.GetEnvironmentVariable("JWT_SECRET_KEY") 
        ?? jwt["Key"] 
        ?? throw new InvalidOperationException("JWT Secret Key is missing.");

    builder.Services
        .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,

                ValidIssuer = jwt["Issuer"],
                ValidAudience = jwt["Audience"],

                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(jwtKey))
            };
        });

    builder.Services.AddAuthorization();

    var app = builder.Build();

    // Global Exception Middleware
    app.UseMiddleware<ExceptionMiddleware>();

    // Swagger
    if (app.Environment.IsDevelopment())
    {
        app.UseSwagger();
        app.UseSwaggerUI();
    }

    // Database Migration & Seed
    using (var scope = app.Services.CreateScope())
    {
        var context = scope.ServiceProvider
            .GetRequiredService<ApplicationDbContext>();

        await context.Database.MigrateAsync();
        await DbInitializer.SeedAsync(context);
    }

    app.UseHttpsRedirection();

    app.UseCors("Frontend");

    app.UseAuthentication();
    app.UseAuthorization();

    app.MapControllers();

    app.Run();
}
catch (Exception ex)
{
    Console.WriteLine(ex.ToString());

    if (ex.InnerException != null)
    {
        Console.WriteLine("INNER:");
        Console.WriteLine(ex.InnerException.ToString());
    }

    throw;
}

// Helper method to convert URI format (postgresql://...) to Npgsql key-value format
static string FormatNpgsqlConnectionString(string connStr)
{
    if (connStr.StartsWith("postgres://") || connStr.StartsWith("postgresql://"))
    {
        var databaseUri = new Uri(connStr);
        var userInfo = databaseUri.UserInfo.Split(':');

        var builder = new NpgsqlConnectionStringBuilder
        {
            Host = databaseUri.Host,
            Port = databaseUri.Port > 0 ? databaseUri.Port : 5432,
            Username = userInfo[0],
            Password = userInfo.Length > 1 ? userInfo[1] : string.Empty,
            Database = databaseUri.AbsolutePath.TrimStart('/'),
            SslMode = SslMode.Require,
            // TrustServerCertificate = true
        };

        return builder.ConnectionString;
    }

    return connStr;
}