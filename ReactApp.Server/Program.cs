using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using ReactApp.Server.Controllers.Admin;
using ReactApp.Server.Data;
using ReactApp.Server.Models;
using ReactApp.Server.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<CinemaDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("Default")
        ?? "Data Source=cinemabox.db"));

builder.Services.AddIdentityCore<ApplicationUser>(options =>
    {
        options.Password.RequiredLength = 8;
        options.Password.RequireNonAlphanumeric = false;
        options.Password.RequireUppercase = true;
        options.User.RequireUniqueEmail = true;
    })
    .AddRoles<IdentityRole>()
    .AddEntityFrameworkStores<CinemaDbContext>();

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidAudience = builder.Configuration["Jwt:Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]!))
        };
    });
builder.Services.AddAuthorization();

builder.Services.AddScoped<TokenService>();

// Katalog na plakaty wgrywane z panelu admina.
// Na Render ustaw zmienną środowiskową UPLOADS_PATH na ścieżkę zamontowanego dysku
// (np. /var/data/uploads) — lokalnie domyślnie wwwroot/uploads.
var uploadsPath = builder.Configuration["UPLOADS_PATH"]
    ?? Path.Combine(builder.Environment.ContentRootPath, "wwwroot", "uploads");
builder.Services.AddSingleton(new UploadsOptions(uploadsPath));

// Za reverse proxy (Render) TLS kończy się przed aplikacją — schemat i IP klienta
// przychodzą w nagłówkach X-Forwarded-*
builder.Services.Configure<ForwardedHeadersOptions>(options =>
{
    options.ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto;
    options.KnownNetworks.Clear();
    options.KnownProxies.Clear();
});

var app = builder.Build();

app.UseForwardedHeaders();

using (var scope = app.Services.CreateScope())
{
    await DbSeeder.SeedAsync(scope.ServiceProvider);
}

app.UseDefaultFiles();
app.UseStaticFiles();

// Plakaty wgrywane z panelu admina — katalog musi istnieć i być serwowany
// jawnie, bo może leżeć poza wwwroot (np. na trwałym dysku Rendera)
Directory.CreateDirectory(uploadsPath);
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(uploadsPath),
    RequestPath = "/uploads"
});

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();

    // W produkcji (Render) HTTPS wymusza proxy platformy — lokalny redirect
    // powodowałby problemy, bo kontener nasłuchuje tylko na HTTP
    app.UseHttpsRedirection();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
