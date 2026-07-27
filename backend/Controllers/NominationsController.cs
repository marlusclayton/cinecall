namespace CineCall.Backend.Controllers;

using Microsoft.AspNetCore.Mvc;
using CineCall.Backend.Data;
using CineCall.Backend.Entities;
using CineCall.Backend.Models.Tmdb;
using CineCall.Backend.Services;

public record CreateNominationRequest(
    int CycleId,
    string IndicatedBy,
    int? TmdbId,
    string? CustomTitle,
    string? CustomOverview
);

[ApiController]
[Route("api/[controller]")]
public class NominationsController : ControllerBase
{
    private readonly MovieClubDbContext _context;
    private readonly ITmdbService _tmdbService;

    public NominationsController(MovieClubDbContext context, ITmdbService tmdbService)
    {
        _context = context;
        _tmdbService = tmdbService;
    }

    [HttpGet("search-tmdb")]
    public async Task<ActionResult<List<MovieDetailsDto>>> SearchTmdb([FromQuery] string query)
    {
        if (string.IsNullOrWhiteSpace(query) || query.Length < 2)
            return Ok(new List<MovieDetailsDto>());

        var results = await _tmdbService.SearchMoviesAsync(query);
        return Ok(results);
    }

    [HttpPost]
    public async Task<IActionResult> CreateNomination([FromBody] CreateNominationRequest request)
    {
        var cycle = await _context.WeeklyCycles.FindAsync(request.CycleId);
        if (cycle == null)
            return BadRequest("Ciclo ativo não encontrado.");

        string title;
        string overview;
        string? posterUrl = null;

        if (request.TmdbId.HasValue)
        {
            var tmdbDetails = await _tmdbService.GetMovieDetailsByIdAsync(request.TmdbId.Value);
            if (tmdbDetails != null)
            {
                title = tmdbDetails.Title;
                overview = tmdbDetails.Overview;
                posterUrl = tmdbDetails.FullPosterUrl;
            }
            else
            {
                title = request.CustomTitle ?? "Filme Sem Título";
                overview = request.CustomOverview ?? "Sem sinopse disponível.";
            }
        }
        else
        {
            title = request.CustomTitle ?? "Filme Sem Título";
            overview = request.CustomOverview ?? "Indicação manual.";
        }

        var nomination = new Nomination
        {
            CycleId = request.CycleId,
            Title = title,
            IndicatedBy = request.IndicatedBy,
            Overview = overview,
            TmdbId = request.TmdbId,
            PosterPath = posterUrl,
            CreatedAt = DateTime.UtcNow
        };

        _context.Nominations.Add(nomination);
        await _context.SaveChangesAsync();

        return Ok(new { Message = "Indicação gravada com sucesso!", NominationId = nomination.Id });
    }
}
