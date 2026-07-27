namespace CineCall.Backend.Models.Tmdb;

using System.Text.Json.Serialization;

public record TmdbSearchResponse(
    [property: JsonPropertyName("page")] int Page,
    [property: JsonPropertyName("results")] List<TmdbMovieResult> Results,
    [property: JsonPropertyName("total_results")] int TotalResults
);

public record TmdbMovieResult(
    [property: JsonPropertyName("id")] int Id,
    [property: JsonPropertyName("title")] string Title,
    [property: JsonPropertyName("original_title")] string OriginalTitle,
    [property: JsonPropertyName("overview")] string Overview,
    [property: JsonPropertyName("poster_path")] string? PosterPath,
    [property: JsonPropertyName("release_date")] string? ReleaseDate,
    [property: JsonPropertyName("vote_average")] double VoteAverage
);

public record MovieDetailsDto(
    int TmdbId,
    string Title,
    string Overview,
    string FullPosterUrl,
    string? ReleaseYear
);
