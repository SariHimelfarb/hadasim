using HMO.Core.Entities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace HMO.Data
{
    public class DataContext:DbContext
    {
        public DbSet<Member> Members { get; set; }
        public DbSet<Vaccination> Vaccinations { get; set; }
        public DbSet<Manufacturer> Manufacturers { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=HMO_db");
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure the relationship between Members and Vaccinations
            modelBuilder.Entity<Member>()
                .HasMany(m => m.Vaccinations)
                .WithOne(v => v.Member)
                .OnDelete(DeleteBehavior.Cascade);

            // Configure the relationship between Manufacturers and Vaccinations
            modelBuilder.Entity<Vaccination>()
                .HasOne(v => v.Manufacturer)
                .WithMany()
                .OnDelete(DeleteBehavior.Cascade);

            base.OnModelCreating(modelBuilder);
        }
    }
}
