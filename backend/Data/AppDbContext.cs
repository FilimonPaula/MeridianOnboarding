using Microsoft.EntityFrameworkCore;
using backend.Models;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Team> Teams { get; set; }
        public DbSet<OnboardingTask> OnboardingTasks { get; set; }

        public DbSet<EmployeeTask> EmployeeTasks { get; set; }

        public DbSet<Meeting> Meetings { get; set; }
        public DbSet<Resource> Resources { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EmployeeTask>()
                .HasKey(et => new { et.UserId, et.OnboardingTaskId });

            base.OnModelCreating(modelBuilder);
        }
    }
}