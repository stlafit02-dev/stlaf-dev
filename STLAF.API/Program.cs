using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using STLAF.API.Configurations;
using STLAF.API.Data;
using STLAF.API.Interfaces.Services;
using System.Text;
using STLAF.API.Services;
using STLAF.API.Mappings;
using STLAF.API.Interfaces.Repositories;
using STLAF.API.Repositories;
using STLAF.API.Middleware;
using System.Text.Json.Serialization;

DotNetEnv.Env.Load();
var builder = WebApplication.CreateBuilder(args);

// Mapper
builder.Services.AddAutoMapper(typeof(MappingProfile));
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ITicketService, TicketService>();
builder.Services.AddScoped<IUserService, UserService>();

// Add Controllers
builder.Services.AddControllers();
var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>() ?? Array.Empty<string>();

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

// Repo
builder.Services.AddScoped<ITicketRepository, TicketRepository>();

// Database
builder.Services.AddDbContext<ApplicationDbContext>(options =>
{
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection"));
});

// JWT Settings
builder.Services.Configure<JwtSettings>(
    builder.Configuration.GetSection("Jwt"));

var jwt = builder.Configuration.GetSection("Jwt");

// Authentication
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
                Encoding.UTF8.GetBytes(jwt["Key"]!))
        };
    });

// Authorization
builder.Services.AddAuthorization();

builder.Services
    .AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(
            new JsonStringEnumConverter()
        );
    });

var app = builder.Build();
// middleware
app.UseMiddleware<ExceptionMiddleware>();

// swagger
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Seeder
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider
        .GetRequiredService<ApplicationDbContext>();

    await context.Database.MigrateAsync();
    await DbInitializer.SeedAsync(context);
}

app.UseHttpsRedirection();
app.UseCors("Frontend");

// Authentication & Authorization
app.UseAuthentication();
app.UseAuthorization();

// Map Controllers
app.MapControllers();

app.Run();