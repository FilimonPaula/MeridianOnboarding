using backend.Data;
using backend.DTOs.Tasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
namespace backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class OnboardingTasksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OnboardingTasksController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<TaskDto>>> GetTasks()
        {
            var tasks = await _context.OnboardingTasks
                .Select(t => new TaskDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    DueDate = t.DueDate,
                    IsCompleted= t.IsCompleted
                })
                .ToListAsync();

            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TaskDto>> GetTask(int id)
        {
            var task = await _context.OnboardingTasks
                .Where(t => t.Id == id)
                .Select(t => new TaskDto
                {
                    Id = t.Id,
                    Title = t.Title,
                    Description = t.Description,
                    DueDate = t.DueDate
                })
                .FirstOrDefaultAsync();

            if (task == null)
            {
                return NotFound();
            }

            return Ok(task);
        }
        [Authorize(Roles = "HR")]
        [HttpPost]
        public async Task<ActionResult<TaskDto>> CreateTask(CreateTaskDto request)
        {
            var task = new OnboardingTask
            {
                Title = request.Title,
                Description = request.Description,
                DueDate = request.DueDate,
                IsCompleted = false
            };

            _context.OnboardingTasks.Add(task);

            await _context.SaveChangesAsync();

            var response = new TaskDto
            {
                Id = task.Id,
                Title = task.Title,
                Description = task.Description,
                DueDate = task.DueDate,
                IsCompleted = task.IsCompleted
            };

            return Ok(response);
        }
        [Authorize(Roles = "HR")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, UpdateTaskDto request)
        {
            var task = await _context.OnboardingTasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            task.Title = request.Title;
            task.Description = request.Description;
            task.DueDate = request.DueDate;
            task.IsCompleted = request.IsCompleted;

            await _context.SaveChangesAsync();

            return NoContent();
        }
        [Authorize(Roles = "HR")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var task = await _context.OnboardingTasks.FindAsync(id);

            if (task == null)
            {
                return NotFound();
            }

            _context.OnboardingTasks.Remove(task);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}