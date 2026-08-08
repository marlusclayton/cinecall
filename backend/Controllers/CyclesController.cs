using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Text.Json;
using CineCall.Backend.Data;
using CineCall.Backend.Entities;

namespace CineCall.Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CyclesController : ControllerBase
{
    private readonly MovieClubDbContext _context;
    private readonly IHttpClientFactory _httpClientFactory;
    private readonly IConfiguration _config;

    public CyclesController(MovieClubDbContext context, IHttpClientFactory httpClientFactory, IConfiguration config)
    {
        _context = context;
        _httpClientFactory = httpClientFactory;
        _config = config;
    }

    [HttpGet("active")]
    public async Task<IActionResult> GetActiveCycle()
    {
        var active = await _context.WeeklyCycles
            .Include(c => c.Category)
            .Include(c => c.Nominations)
            .Where(c => c.Status != CycleStatus.Completed)
            .OrderByDescending(c => c.StartedAt)
            .Select(c => new
            {
                c.Id,
                c.Status,
                Category = c.Category != null ? new { c.Category.Id, c.Category.Name, c.Category.Description } : null,
                Nominations = c.Nominations.Select(n => new {
                    n.Id,
                    n.Title,
                    n.IndicatedBy,
                    n.Overview,
                    PosterUrl = !string.IsNullOrWhiteSpace(n.PosterPath)
                        ? (n.PosterPath.StartsWith("http") ? n.PosterPath : $"https://image.tmdb.org/t/p/w500{n.PosterPath}")
                        : null,
                    n.TmdbId
                })
            })
            .FirstOrDefaultAsync();

        if (active == null) return NoContent();
        return Ok(active);
    }

    [HttpGet("tmdb-search")]
    public async Task<IActionResult> SearchTmdb([FromQuery] string query)
    {
        if (string.IsNullOrWhiteSpace(query)) return BadRequest(new { message = "Query is required." });

        var tmdbApiKey = _config["TMDB_API_KEY"] ?? _config["TmdbApiKey"];

        try
        {
            var client = _httpClientFactory.CreateClient();
            var searchUrl = $"https://api.themoviedb.org/3/search/movie?api_key={tmdbApiKey}&language=pt-BR&query={Uri.EscapeDataString(query)}";
            var response = await client.GetAsync(searchUrl);

            if (!response.IsSuccessStatusCode) return BadRequest(new { message = "Error contacting TMDB." });

            var json = await response.Content.ReadAsStringAsync();
            using var doc = JsonDocument.Parse(json);
            var results = doc.RootElement.GetProperty("results");

            var list = new List<object>();
            int count = 0;

            foreach (var item in results.EnumerateArray())
            {
                if (count++ >= 8) break;

                int id = item.GetProperty("id").GetInt32();
                string title = item.GetProperty("title").GetString() ?? "";
                string overview = item.TryGetProperty("overview", out var ov) && ov.ValueKind != JsonValueKind.Null ? ov.GetString() ?? "" : "";
                string? posterPath = item.TryGetProperty("poster_path", out var p) && p.ValueKind != JsonValueKind.Null ? p.GetString() : null;
                string releaseDate = item.TryGetProperty("release_date", out var rd) && rd.ValueKind != JsonValueKind.Null ? rd.GetString() ?? "" : "";

                string yearDisplay = "";
                if (!string.IsNullOrEmpty(releaseDate) && releaseDate.Length >= 4)
                {
                    yearDisplay = releaseDate.Substring(0, 4);
                }

                list.Add(new {
                    tmdbId = id,
                    title = title,
                    releaseYear = yearDisplay,
                    overview = overview,
                    posterUrl = posterPath != null ? $"https://image.tmdb.org/t/p/w500{posterPath}" : null
                });
            }

            return Ok(list);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }
    }

    [HttpPost("start")]
    public async Task<IActionResult> StartCycle([FromBody] StartCycleRequest request)
    {
        var activeCycles = await _context.WeeklyCycles
            .Where(c => c.Status != CycleStatus.Completed)
            .ToListAsync();

        foreach (var c in activeCycles)
        {
            c.Status = CycleStatus.Completed;
        }

        var selectedCategory = await _context.Categories.FindAsync(request.CategoryId);
        if (selectedCategory != null)
        {
            selectedCategory.IsActive = false;
        }

        var newCycle = new WeeklyCycle
        {
            CategoryId = request.CategoryId,
            StartedAt = DateTime.UtcNow,
            Status = CycleStatus.Nominating
        };

        _context.WeeklyCycles.Add(newCycle);
        await _context.SaveChangesAsync();

        return Ok(newCycle);
    }

    [HttpPost("random-start")]
    public async Task<IActionResult> RandomStart()
    {
        var categories = await _context.Categories.Where(c => c.IsActive).ToListAsync();
        if (!categories.Any()) return BadRequest("Todas as categorias já foram utilizadas! Resete o pool de categorias.");

        var random = new Random();
        var category = categories[random.Next(categories.Count)];

        return await StartCycle(new StartCycleRequest(category.Id));
    }

    [HttpPut("nominations/{id:int}")]
    public async Task<IActionResult> UpdateNomination(int id, [FromBody] UpdateNominationRequest request)
    {
        var nomination = await _context.Nominations.FirstOrDefaultAsync(n => n.Id == id);
        if (nomination == null)
            return NotFound(new { message = $"Indicação com ID {id} não encontrada." });

        nomination.Title = request.Title;
        nomination.IndicatedBy = request.IndicatedBy;

        var tmdbApiKey = _config["TMDB_API_KEY"] ?? _config["TmdbApiKey"];

        if (request.TmdbId.HasValue && request.TmdbId.Value > 0)
        {
            try
            {
                var client = _httpClientFactory.CreateClient();
                var detailUrl = $"https://api.themoviedb.org/3/movie/{request.TmdbId.Value}?api_key={tmdbApiKey}&language=pt-BR";
                var detailResponse = await client.GetAsync(detailUrl);

                if (detailResponse.IsSuccessStatusCode)
                {
                    var json = await detailResponse.Content.ReadAsStringAsync();
                    using var doc = JsonDocument.Parse(json);
                    var root = doc.RootElement;

                    nomination.Title = root.GetProperty("title").GetString() ?? request.Title;
                    nomination.TmdbId = request.TmdbId.Value;

                    if (root.TryGetProperty("overview", out var ov) && ov.ValueKind != JsonValueKind.Null && !string.IsNullOrWhiteSpace(ov.GetString()))
                    {
                        nomination.Overview = ov.GetString()!;
                    }

                    if (root.TryGetProperty("poster_path", out var poster) && poster.ValueKind != JsonValueKind.Null && !string.IsNullOrWhiteSpace(poster.GetString()))
                    {
                        nomination.PosterPath = $"https://image.tmdb.org/t/p/w500{poster.GetString()}";
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error fetching detailed TMDB info: {ex.Message}");
            }
        }
        else
        {
            if (!string.IsNullOrWhiteSpace(request.Overview))
            {
                nomination.Overview = request.Overview;
            }
            if (!string.IsNullOrWhiteSpace(request.PosterUrl))
            {
                nomination.PosterPath = request.PosterUrl;
            }
        }

        _context.Nominations.Update(nomination);
        await _context.SaveChangesAsync();

        return Ok(nomination);
    }

    [HttpDelete("nominations/{id:int}")]
    public async Task<IActionResult> DeleteNomination(int id)
    {
        var nomination = await _context.Nominations.FirstOrDefaultAsync(n => n.Id == id);
        if (nomination == null)
            return NotFound(new { message = $"Indicação com ID {id} não encontrada." });

        _context.Nominations.Remove(nomination);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Indicação removida com sucesso." });
    }

    [HttpPost("send-summary")]
    public async Task<IActionResult> SendSummary()
    {
        var activeCycle = await _context.WeeklyCycles
            .Include(c => c.Category)
            .Include(c => c.Nominations)
            .FirstOrDefaultAsync(c => c.Status != CycleStatus.Completed);

        if (activeCycle == null)
            return BadRequest(new { message = "Nenhum ciclo ativo." });

        if (!activeCycle.Nominations.Any())
            return BadRequest(new { message = "Nenhuma indicação cadastrada para este ciclo." });

        var categoryName = activeCycle.Category?.Name ?? "Sem Categoria";
        var client = _httpClientFactory.CreateClient();

        var sb = new StringBuilder();
        sb.AppendLine($"🎬 * RESUMO DAS INDICAÇÕES*");
        sb.AppendLine($"🏷️ *Tema:* {categoryName}\n");

        int index = 1;
        foreach (var nom in activeCycle.Nominations)
        {
            sb.AppendLine($"*{index}. {nom.Title}*");
            sb.AppendLine($"👤 *Indicado por:* {nom.IndicatedBy}");
            sb.AppendLine($"📝 *Sinopse:* {nom.Overview ?? "Sinopse não disponível."}");
            sb.AppendLine();
            index++;
        }

        sb.AppendLine("📌 _Vote na enquete enviada a seguir!_");

        return await SendWahaTextMessage(sb.ToString(), client);
    }

    // Feature 3: Simple List ("movie name - nominator")
    [HttpPost("send-list")]
    public async Task<IActionResult> SendSimpleList()
    {
        var activeCycle = await _context.WeeklyCycles
            .Include(c => c.Nominations)
            .FirstOrDefaultAsync(c => c.Status != CycleStatus.Completed);

        if (activeCycle == null)
            return BadRequest(new { message = "Nenhum ciclo ativo." });

        if (!activeCycle.Nominations.Any())
            return BadRequest(new { message = "Nenhuma indicação cadastrada." });

        var sb = new StringBuilder();
        sb.AppendLine("🎬 * LISTA DE INDICAÇÕES*\n");

        foreach (var nom in activeCycle.Nominations)
        {
            sb.AppendLine($"• *{nom.Title}* - {nom.IndicatedBy}");
        }

        var client = _httpClientFactory.CreateClient();
        return await SendWahaTextMessage(sb.ToString(), client);
    }

    // Feature 1: Primary Poll (Multiple Selection Allowed)
    [HttpPost("send-poll")]
    public async Task<IActionResult> SendPoll()
    {
        return await DispatchWahaPoll(multipleSelection: true, pollTitle: "🍿 Qual filme assistiremos essa semana? (Múltipla escolha)");
    }

    // Feature 2: Tie-Breaker Poll (Single Selection Only)
    [HttpPost("send-tiebreaker-poll")]
    public async Task<IActionResult> SendTiebreakerPoll()
    {
        return await DispatchWahaPoll(multipleSelection: false, pollTitle: "⚖️ DESEMPATE! Escolha apenas 1 opção:");
    }

    private async Task<IActionResult> DispatchWahaPoll(bool multipleSelection, string pollTitle)
    {
        var activeCycle = await _context.WeeklyCycles
            .Include(c => c.Nominations)
            .FirstOrDefaultAsync(c => c.Status != CycleStatus.Completed);

        if (activeCycle == null)
            return BadRequest(new { message = "Nenhum ciclo ativo." });

        if (!activeCycle.Nominations.Any())
            return BadRequest(new { message = "É necessário ter pelo menos 1 indicação para enviar a enquete!" });

        var options = activeCycle.Nominations.Select(n => n.Title).ToList();
        var chatId = _config["WAHA_CHAT_ID"] ?? _config["WHATSAPP_CHAT_ID"] ?? "120363419707406231@g.us";
        var wahaUrl = _config["WAHA_URL"] ?? "http://waha:3000";
        var apiKey = _config["WAHA_API_KEY"] ?? _config["WHATSAPP_API_KEY"] ?? "movieclub123secret";
        var session = _config["WAHA_SESSION"] ?? "default";

        var payload = new
        {
            session = session,
            chatId = chatId,
            poll = new
            {
                name = pollTitle,
                options = options,
                multipleAnswers = multipleSelection
            }
        };

        try
        {
            var client = _httpClientFactory.CreateClient();
            if (!string.IsNullOrEmpty(apiKey))
            {
                client.DefaultRequestHeaders.Remove("X-Api-Key");
                client.DefaultRequestHeaders.Add("X-Api-Key", apiKey);
            }

            var jsonContent = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");
            var response = await client.PostAsync($"{wahaUrl}/api/sendPoll", jsonContent);

            if (!response.IsSuccessStatusCode)
            {
                var errBody = await response.Content.ReadAsStringAsync();
                return StatusCode((int)response.StatusCode, new { message = $"WAHA error: {errBody}" });
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }

        activeCycle.Status = CycleStatus.PollActive;
        await _context.SaveChangesAsync();

        return Ok(new { message = multipleSelection ? "Enquete múltipla enviada!" : "Enquete de desempate enviada!" });
    }

    private async Task<IActionResult> SendWahaTextMessage(string textMessage, HttpClient client)
    {
        var chatId = _config["WAHA_CHAT_ID"] ?? _config["WHATSAPP_CHAT_ID"] ?? "120363419707406231@g.us";
        var wahaUrl = _config["WAHA_URL"] ?? "http://waha:3000";
        var apiKey = _config["WAHA_API_KEY"] ?? _config["WHATSAPP_API_KEY"] ?? "movieclub123secret";
        var session = _config["WAHA_SESSION"] ?? "default";

        var payload = new { session = session, chatId = chatId, text = textMessage };

        try
        {
            if (!string.IsNullOrEmpty(apiKey))
            {
                client.DefaultRequestHeaders.Remove("X-Api-Key");
                client.DefaultRequestHeaders.Add("X-Api-Key", apiKey);
            }

            var jsonContent = new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json");
            var response = await client.PostAsync($"{wahaUrl}/api/sendText", jsonContent);

            if (!response.IsSuccessStatusCode)
            {
                var errBody = await response.Content.ReadAsStringAsync();
                return StatusCode((int)response.StatusCode, new { message = $"WAHA error: {errBody}" });
            }
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = ex.Message });
        }

        return Ok(new { message = "Mensagem enviada para o WhatsApp com sucesso!" });
    }

    [HttpPost("complete")]
    public async Task<IActionResult> CompleteCycle()
    {
        var active = await _context.WeeklyCycles
            .FirstOrDefaultAsync(c => c.Status != CycleStatus.Completed);

        if (active != null)
        {
            active.Status = CycleStatus.Completed;
            await _context.SaveChangesAsync();
        }

        return Ok(new { message = "Cycle closed." });
    }
}

public record StartCycleRequest(int CategoryId);
public record UpdateNominationRequest(string Title, string IndicatedBy, string? Overview, int? TmdbId, string? PosterUrl);
