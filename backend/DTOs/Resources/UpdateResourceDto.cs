namespace backend.DTOs.Resources
{
    public class UpdateResourceDto
    {
        public string Title { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string Url { get; set; } = string.Empty;
    }
}