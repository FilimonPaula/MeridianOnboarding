using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeamsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TeamsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Team>>> GetTeams()
        {
            var teams = await _context.Teams.ToListAsync();

            return Ok(teams);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Team>> GetTeam(int id)
        {
            var team = await _context.Teams.FindAsync(id);

            if (team == null)
            {
                return NotFound();
            }

            return Ok(team);
        }

        [HttpPost]
        public async Task<ActionResult<Team>> CreateTeam(Team request)
        {
            var team = new Team
            {
                Name = request.Name,
                Description = request.Description
            };

            _context.Teams.Add(team);

            await _context.SaveChangesAsync();

            return Ok(team);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTeam(int id, Team request)
        {
            var team = await _context.Teams.FindAsync(id);

            if (team == null)
            {
                return NotFound();
            }

            team.Name = request.Name;
            team.Description = request.Description;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeam(int id)
        {
            var team = await _context.Teams.FindAsync(id);

            if (team == null)
            {
                return NotFound();
            }

            _context.Teams.Remove(team);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}