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

        // modelBuilder.Entity<Category>().HasData(
        //     new Category { Id = 1, Name = "Sci-Fi & Cyberpunk", Description = "Ficção científica e futuros distópicos", IsActive = true },
        //     new Category { Id = 2, Name = "Terror & Thriller", Description = "Susto, suspense e terror psicológico", IsActive = true },
        //     new Category { Id = 3, Name = "Anos 80 e 90", Description = "Clássicos cult e nostalgia das décadas passadas", IsActive = true },
        //     new Category { Id = 4, Name = "Comédia Leve", Description = "Filmes engraçados e descontraídos", IsActive = true },
        //     new Category { Id = 5, Name = "Animação", Description = "Animações ocidentais ou animes fantásticos", IsActive = true },
        //     new Category { Id = 6, Name = "Ação & Adrenalina", Description = "Explosões, tiro e perseguição", IsActive = true },
        //     new Category { Id = 7, Name = "Cinema Nacional", Description = "Grandes produções e clássicos brasileiros", IsActive = true },
        //     new Category { Id = 8, Name = "Mindfuck & Plot Twists", Description = "Filmes com reviravoltas surpreendentes", IsActive = true }
        // );
    }
}
