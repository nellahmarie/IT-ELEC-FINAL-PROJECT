using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class TaskList
    {
        public int Id { get; set; }
        public string? Title { get; set; }
        public bool IsArchived { get; set; } = false;
        public virtual ICollection<TodoTask> TodoTasks { get; set; } = new List<TodoTask>();
    }
}
