using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CineCall.Backend.Data;

namespace CineCall.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoriesController : ControllerBase
{
    private readonly MovieClubDbContext _context;

    public CategoriesController(MovieClubDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAvailableCategories()
    {
        var categories = await _context.Categories
            .Where(c => c.IsActive)
            .OrderBy(c => c.Name)
            .Select(c => new { c.Id, c.Name, c.Description })
            .ToListAsync();

        return Ok(categories);
    }

    [HttpPost("reset-pool")]
    public async Task<IActionResult> ResetCategoriesPool()
    {
        await _context.Database.ExecuteSqlRawAsync("UPDATE \"Categories\" SET \"IsActive\" = true");
        return Ok(new { message = "Todas as categorias foram liberadas para novos sorteios!" });
    }
}
