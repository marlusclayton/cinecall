using Microsoft.EntityFrameworkCore;
using CineCall.Backend.Data;
using CineCall.Backend.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader());
});

builder.Services.AddControllers().AddJsonOptions(options => {
    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
});

builder.Services.AddDbContext<MovieClubDbContext>(options =>
    options.UseNpgsql(
        builder.Configuration.GetConnectionString("DefaultConnection"),
        npgsqlOptions => npgsqlOptions.MigrationsAssembly(typeof(MovieClubDbContext).Assembly.FullName)
    ));

builder.Services.Configure<TmdbOptions>(builder.Configuration.GetSection("Tmdb"));
builder.Services.AddHttpClient<ITmdbService, TmdbService>();

var app = builder.Build();

app.UseRouting();
app.UseCors("AllowAll");
app.UseAuthorization();

app.MapControllers();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<MovieClubDbContext>();
    // NOTE: This project has no EF Core Migrations/ folder committed, so
    // Database.Migrate() was a silent no-op (zero migrations to apply),
    // meaning the Categories/WeeklyCycles/Nominations tables were never
    // created and every query against them failed with "relation does not
    // exist". EnsureCreated() builds the schema directly from the model
    // (and applies the Category HasData seed) without needing migration
    // files. If you later want proper EF migrations, run
    // `dotnet ef migrations add InitialCreate` and switch this back to
    // Migrate() - just don't mix EnsureCreated() and Migrate() together.
    dbContext.Database.EnsureCreated();

    if (!dbContext.Categories.Any())
    {
        var seedPath = Path.Combine(AppContext.BaseDirectory, "init.sql");
        if (File.Exists(seedPath))
        {
            var seedSql = File.ReadAllText(seedPath);
            dbContext.Database.ExecuteSqlRaw(seedSql);
            Console.WriteLine("Seeded database from init.sql");
        }
        else
        {
            Console.WriteLine($"No seed file found at {seedPath} - Categories is empty and nothing was seeded.");
        }
    }
}

app.Run();
