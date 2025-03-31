using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Notes_Backend.Models;

namespace Notes_Backend.Helpers
{
    public class DataContext : DbContext
    {
        private readonly IConfiguration _config;

        public DataContext(IConfiguration config)
        {
            _config = config;
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Note> Notes { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder options)
            => options.UseNpgsql(_config.GetConnectionString("notes_backend"));
    }
}
