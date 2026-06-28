namespace backend.DTOs.EmployeeTasks
{
    public class EmployeeTaskDto
    {
        public int UserId { get; set; }

        public int OnboardingTaskId { get; set; }

        public string TaskTitle { get; set; } = string.Empty;

        public string TaskDescription { get; set; } = string.Empty;

        public DateTime DueDate { get; set; }

        public bool IsCompleted { get; set; }
    }
}