namespace CineCall.Backend.Services;

using System.Net.Http.Json;
using Microsoft.Extensions.Options;
using CineCall.Backend.Models.Tmdb;

public interface ITmdbService
{
    Task<List<MovieDetailsDto>> SearchMoviesAsync(string query, CancellationToken cancellationToken = default);
    Task<MovieDetailsDto?> GetMovieDetailsByIdAsync(int tmdbId, CancellationToken cancellationToken = default);
}

public class TmdbOptions
{
    public string ApiKey { get; set; } = string.Empty;
    public string BaseUrl { get; set; } = "https://api.themoviedb.org/3/";
    public string ImageBaseUrl { get; set; } = "https://image.tmdb.org/t/p/w500";
    public string Language { get; set; } = "pt-BR";
}

public class TmdbService : ITmdbService
{
    private readonly HttpClient _httpClient;
    private readonly TmdbOptions _options;
    private readonly ILogger<TmdbService> _logger;

    public TmdbService(HttpClient httpClient, IOptions<TmdbOptions> options, ILogger<TmdbService> logger)
    {
        _httpClient = httpClient;
        _options = options.Value;
        _logger = logger;
    }

    public async Task<List<MovieDetailsDto>> SearchMoviesAsync(string query, CancellationToken cancellationToken = default)
    {
        if (string.IsNullOrWhiteSpace(query))
            return new List<MovieDetailsDto>();

        try
        {
            var url = $"search/movie?api_key={_options.ApiKey}&query={Uri.EscapeDataString(query)}&language={_options.Language}&include_adult=false";
            var response = await _httpClient.GetFromJsonAsync<TmdbSearchResponse>(url, cancellationToken);

            if (response?.Results == null || response.Results.Count == 0)
                return new List<MovieDetailsDto>();

            return response.Results.Select(MapToDto).ToList();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to search movies on TMDB for query: {Query}", query);
            return new List<MovieDetailsDto>();
        }
    }

    public async Task<MovieDetailsDto?> GetMovieDetailsByIdAsync(int tmdbId, CancellationToken cancellationToken = default)
    {
        try
        {
            var url = $"movie/{tmdbId}?api_key={_options.ApiKey}&language={_options.Language}";
            var movie = await _httpClient.GetFromJsonAsync<TmdbMovieResult>(url, cancellationToken);

            return movie != null ? MapToDto(movie) : null;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Failed to fetch details for TMDB ID: {TmdbId}", tmdbId);
            return null;
        }
    }

    private MovieDetailsDto MapToDto(TmdbMovieResult result)
    {
        var posterUrl = !string.IsNullOrEmpty(result.PosterPath)
            ? $"{_options.ImageBaseUrl.TrimEnd('/')}/{result.PosterPath.TrimStart('/')}"
            : "https://via.placeholder.com/500x750?text=Sem+Poster";

        var year = !string.IsNullOrEmpty(result.ReleaseDate) && result.ReleaseDate.Length >= 4
            ? result.ReleaseDate[..4]
            : null;

        return new MovieDetailsDto(
            TmdbId: result.Id,
            Title: result.Title,
            Overview: string.IsNullOrWhiteSpace(result.Overview) ? "Sem sinopse disponível." : result.Overview,
            FullPosterUrl: posterUrl,
            ReleaseYear: year
        );
    }
}
