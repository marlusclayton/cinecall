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
}

app.Run();
