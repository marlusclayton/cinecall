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
    dbContext.Database.Migrate();
    Console.WriteLine("Database migrated (schema + baseline categories from HasData).");
    Console.WriteLine("If this is a fresh database and you want your real data (cycles/nominations/full category list),");
    Console.WriteLine("run init.sql manually now:  docker compose exec -T postgres psql -U <user> -d <db> < init.sql");
}

app.Run();
