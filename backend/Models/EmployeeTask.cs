namespace backend.Models
{
    public class EmployeeTask
    {
        public int UserId { get; set; }

        public User User { get; set; } = null!;

        public int OnboardingTaskId { get; set; }

        public OnboardingTask OnboardingTask { get; set; } = null!;

        public bool IsCompleted { get; set; }
    }
}