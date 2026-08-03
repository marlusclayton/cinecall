namespace CineCall.Backend.Data;

using Microsoft.EntityFrameworkCore;
using CineCall.Backend.Entities;

public class MovieClubDbContext : DbContext
{
    public MovieClubDbContext(DbContextOptions<MovieClubDbContext> options) : base(options) { }

    public DbSet<Category> Categories => Set<Category>();
    public DbSet<WeeklyCycle> WeeklyCycles => Set<WeeklyCycle>();
    public DbSet<Nomination> Nominations => Set<Nomination>();
    public DbSet<Poll> Polls => Set<Poll>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<WeeklyCycle>()
            .Property(c => c.Status)
            .HasConversion<string>();

        // Required FK defaults to Cascade in EF Core - without this override,
        // deleting a Category that's ever been used in a WeeklyCycle would
        // silently cascade-delete that cycle and its nominations too. Restrict
        // means the delete fails with a catchable DbUpdateException instead,
        // which CategoriesController.DeleteCategory turns into a friendly
        // "deactivate it instead" message.
        modelBuilder.Entity<WeeklyCycle>()
            .HasOne(wc => wc.Category)
            .WithMany(c => c.WeeklyCycles)
            .HasForeignKey(wc => wc.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);

        modelBuilder.Entity<Category>().HasData(
            new Category { Id = 1, Name = "Sci-Fi & Cyberpunk", Description = "Ficção científica e futuros distópicos", IsActive = true, CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
            new Category { Id = 2, Name = "Terror & Thriller", Description = "Susto, suspense e terror psicológico", IsActive = true, CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
            new Category { Id = 3, Name = "Anos 80 e 90", Description = "Clássicos cult e nostalgia das décadas passadas", IsActive = true, CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
            new Category { Id = 4, Name = "Comédia Leve", Description = "Filmes engraçados e descontraídos", IsActive = true, CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
            new Category { Id = 5, Name = "Animação", Description = "Animações ocidentais ou animes fantásticos", IsActive = true, CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
            new Category { Id = 6, Name = "Ação & Adrenalina", Description = "Explosões, tiro e perseguição", IsActive = true, CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
            new Category { Id = 7, Name = "Cinema Nacional", Description = "Grandes produções e clássicos brasileiros", IsActive = true, CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
            new Category { Id = 8, Name = "Mindfuck & Plot Twists", Description = "Filmes com reviravoltas surpreendentes", IsActive = true, CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) }
        );
    }
}
