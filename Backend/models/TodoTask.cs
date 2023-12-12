namespace backend.Models
{
    public class TodoTask
    {
        public int Id { get; set; }
        public string? Todo { get; set; }
        public bool IsCompleted { get; set; } = false;
    }
}