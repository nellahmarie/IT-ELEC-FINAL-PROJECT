using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? Username { get; set; }
        public string? Password {  get; set; }
        public virtual ICollection<TaskList> TaskLists { get; set; } = new List<TaskList>();
    }
}
