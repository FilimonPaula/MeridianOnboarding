namespace backend.DTOs.Users
{
    public class UpdateUserDto
    {
        public string FirstName { get; set; } = string.Empty;

        public string LastName { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Role { get; set; } = string.Empty;

        public string JobTitle { get; set; } = string.Empty;

        public int TeamId { get; set; }
    }
}