using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReactApp.Server.Data;

namespace ReactApp.Server.Controllers.Admin;

// Ścieżka katalogu uploadów — konfigurowana w Program.cs (env UPLOADS_PATH)
public record UploadsOptions(string Path);

[ApiController]
[Route("api/admin/upload")]
[Authorize(Roles = DbSeeder.AdminRole)]
public class AdminUploadController(UploadsOptions uploads) : ControllerBase
{
    private static readonly string[] AllowedExtensions = [".jpg", ".jpeg", ".png", ".webp"];
    private const long MaxFileSize = 5 * 1024 * 1024; // 5 MB

    [HttpPost]
    [RequestSizeLimit(MaxFileSize)]
    public async Task<ActionResult> UploadImage(IFormFile file)
    {
        if (file is null || file.Length == 0)
            return BadRequest(new { message = "Nie przesłano pliku." });

        if (file.Length > MaxFileSize)
            return BadRequest(new { message = "Plik jest za duży (maksymalnie 5 MB)." });

        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
        if (!AllowedExtensions.Contains(extension))
            return BadRequest(new { message = "Dozwolone formaty: JPG, PNG, WEBP." });

        Directory.CreateDirectory(uploads.Path);

        var fileName = $"{Guid.NewGuid():N}{extension}";
        var filePath = Path.Combine(uploads.Path, fileName);

        await using (var stream = System.IO.File.Create(filePath))
        {
            await file.CopyToAsync(stream);
        }

        return Ok(new { url = $"/uploads/{fileName}" });
    }
}
