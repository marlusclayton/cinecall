using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using CineCall.Backend.Data;
using CineCall.Backend.Entities;

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

    [HttpGet("all")]
    public async Task<IActionResult> GetAllCategories()
    {
        var categories = await _context.Categories
            .OrderBy(c => c.Name)
            .Select(c => new { c.Id, c.Name, c.Description, c.IsActive, c.CreatedAt })
            .ToListAsync();

        return Ok(categories);
    }

    public record CreateCategoryRequest(string Name, string? Description);

    [HttpPost]
    public async Task<IActionResult> CreateCategory([FromBody] CreateCategoryRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Name))
            return BadRequest(new { message = "O nome da categoria é obrigatório." });

        var exists = await _context.Categories
            .AnyAsync(c => c.Name.ToLower() == request.Name.Trim().ToLower());
        if (exists)
            return Conflict(new { message = "Já existe uma categoria com esse nome." });

        var category = new Category
        {
            Name = request.Name.Trim(),
            Description = request.Description?.Trim(),
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        _context.Categories.Add(category);
        await _context.SaveChangesAsync();

        return Ok(new { category.Id, category.Name, category.Description, category.IsActive, category.CreatedAt });
    }

    public record UpdateCategoryRequest(string Name, string? Description);

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateCategory(int id, [FromBody] UpdateCategoryRequest request)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category == null)
            return NotFound(new { message = "Categoria não encontrada." });

        if (string.IsNullOrWhiteSpace(request.Name))
            return BadRequest(new { message = "O nome da categoria é obrigatório." });

        var duplicate = await _context.Categories
            .AnyAsync(c => c.Id != id && c.Name.ToLower() == request.Name.Trim().ToLower());
        if (duplicate)
            return Conflict(new { message = "Já existe uma categoria com esse nome." });

        category.Name = request.Name.Trim();
        category.Description = request.Description?.Trim();
        await _context.SaveChangesAsync();

        return Ok(new { category.Id, category.Name, category.Description, category.IsActive, category.CreatedAt });
    }

    [HttpPatch("{id}/toggle-active")]
    public async Task<IActionResult> ToggleActive(int id)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category == null)
            return NotFound(new { message = "Categoria não encontrada." });

        category.IsActive = !category.IsActive;
        await _context.SaveChangesAsync();

        return Ok(new { category.Id, category.IsActive });
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var category = await _context.Categories.FindAsync(id);
        if (category == null)
            return NotFound(new { message = "Categoria não encontrada." });

        _context.Categories.Remove(category);
        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateException)
        {
            return Conflict(new
            {
                message = "Essa categoria já foi usada em um ciclo e não pode ser excluída. Desative-a em vez disso."
            });
        }

        return Ok(new { message = "Categoria excluída." });
    }

    [HttpPost("reset-pool")]
    public async Task<IActionResult> ResetCategoriesPool()
    {
        await _context.Database.ExecuteSqlRawAsync("UPDATE \"Categories\" SET \"IsActive\" = true");
        return Ok(new { message = "Todas as categorias foram liberadas para novos sorteios!" });
    }
}
