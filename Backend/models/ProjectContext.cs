using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class ProjectContext: DbContext
    {
        public ProjectContext() { }
        public ProjectContext(DbContextOptions<ProjectContext> options) : base(options) { }
        public DbSet<User> Users { get; set; }
        public DbSet<TodoTask> TodoTasks { get; set; }
        public DbSet<TaskList> TaskList { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //base.OnModelCreating(modelBuilder);
        }
    }
}
