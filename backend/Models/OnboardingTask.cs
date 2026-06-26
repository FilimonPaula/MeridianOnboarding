namespace backend.Models
{
    public class OnboardingTask
    {
        public int Id { get; set; }

        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public DateTime DueDate { get; set; }

        public ICollection<EmployeeTask> EmployeeTasks { get; set; } = new List<EmployeeTask>();
    }
}