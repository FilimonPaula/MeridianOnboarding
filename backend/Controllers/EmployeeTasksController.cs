using backend.Data;
using backend.DTOs.EmployeeTasks;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EmployeeTasksController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EmployeeTasksController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("assign")]
        public async Task<IActionResult> AssignTask(AssignTaskDto request)
        {
            var user = await _context.Users.FindAsync(request.UserId);

            if (user == null)
            {
                return BadRequest("User not found.");
            }

            var task = await _context.OnboardingTasks.FindAsync(request.OnboardingTaskId);

            if (task == null)
            {
                return BadRequest("Task not found.");
            }

            var alreadyAssigned = await _context.EmployeeTasks
                .AnyAsync(et => et.UserId == request.UserId &&
                                et.OnboardingTaskId == request.OnboardingTaskId);

            if (alreadyAssigned)
            {
                return BadRequest("Task is already assigned to this user.");
            }

            var employeeTask = new EmployeeTask
            {
                UserId = request.UserId,
                OnboardingTaskId = request.OnboardingTaskId,
                IsCompleted = false
            };

            _context.EmployeeTasks.Add(employeeTask);

            await _context.SaveChangesAsync();

            return Ok("Task assigned successfully.");
        }

        [HttpGet("user/{userId}")]
        public async Task<ActionResult<List<EmployeeTaskDto>>> GetTasksForUser(int userId)
        {
            var userExists = await _context.Users.AnyAsync(u => u.Id == userId);

            if (!userExists)
            {
                return NotFound("User not found.");
            }

            var tasks = await _context.EmployeeTasks
                .Include(et => et.OnboardingTask)
                .Where(et => et.UserId == userId)
                .Select(et => new EmployeeTaskDto
                {
                    UserId = et.UserId,
                    OnboardingTaskId = et.OnboardingTaskId,
                    TaskTitle = et.OnboardingTask.Title,
                    TaskDescription = et.OnboardingTask.Description,
                    DueDate = et.OnboardingTask.DueDate,
                    IsCompleted = et.IsCompleted
                })
                .ToListAsync();

            return Ok(tasks);
        }

        [HttpPut("complete")]
        public async Task<IActionResult> CompleteTask(AssignTaskDto request)
        {
            var employeeTask = await _context.EmployeeTasks
                .FirstOrDefaultAsync(et => et.UserId == request.UserId &&
                                           et.OnboardingTaskId == request.OnboardingTaskId);

            if (employeeTask == null)
            {
                return NotFound("Assigned task not found.");
            }

            employeeTask.IsCompleted = true;

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}