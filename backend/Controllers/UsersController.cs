using backend.Data;
using backend.DTOs.Users;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;
namespace backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<UserDto>>> GetUsers()
        {
            var users = await _context.Users.Include(u => u.Team)
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Email = u.Email,
                    Role = u.Role,
                    JobTitle = u.JobTitle,
                    TeamName = u.Team.Name
                })
                .ToListAsync();

            return Ok(users);
        }
                [HttpGet("{id}")]
        public async Task<ActionResult<UserDto>> GetUser(int id)
        {
            var user = await _context.Users
                .Include(u => u.Team)
                .Where(u => u.Id == id)
                .Select(u => new UserDto
                {
                    Id = u.Id,
                    FirstName = u.FirstName,
                    LastName = u.LastName,
                    Email = u.Email,
                    Role = u.Role,
                    JobTitle = u.JobTitle,
                    TeamName = u.Team.Name
                })
                .FirstOrDefaultAsync();

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }
        [Authorize(Roles = "HR")]
        [HttpPost]
        public async Task<ActionResult<UserDto>> CreateUser(CreateUserDto request)
        {
            var team = await _context.Teams.FindAsync(request.TeamId);

            if (team == null)
            {
                return BadRequest("Team not found.");
            }

            var user = new User
            {
                FirstName = request.FirstName,
                LastName = request.LastName,
                Email = request.Email,
                PasswordHash = request.Password,
                Role = request.Role,
                JobTitle = request.JobTitle,
                TeamId = request.TeamId
            };

            _context.Users.Add(user);

            await _context.SaveChangesAsync();

            var response = new UserDto
            {
                Id = user.Id,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Role = user.Role,
                JobTitle = user.JobTitle,
                TeamName = team.Name
            };

            return Ok(response);
        }
        [Authorize(Roles = "HR")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UpdateUserDto request)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            var team = await _context.Teams.FindAsync(request.TeamId);

            if (team == null)
            {
                return BadRequest("Team not found.");
            }

            user.FirstName = request.FirstName;
            user.LastName = request.LastName;
            user.Email = request.Email;
            user.Role = request.Role;
            user.JobTitle = request.JobTitle;
            user.TeamId = request.TeamId;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = "HR")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}