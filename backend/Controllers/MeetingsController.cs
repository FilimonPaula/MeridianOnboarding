using backend.Data;
using backend.DTOs.Meetings;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class MeetingsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MeetingsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<MeetingDto>>> GetMeetings()
        {
            var meetings = await _context.Meetings
                .Select(m => new MeetingDto
                {
                    Id = m.Id,
                    Title = m.Title,
                    Description = m.Description,
                    Date = m.Date,
                    Location = m.Location
                })
                .ToListAsync();

            return Ok(meetings);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MeetingDto>> GetMeeting(int id)
        {
            var meeting = await _context.Meetings
                .Where(m => m.Id == id)
                .Select(m => new MeetingDto
                {
                    Id = m.Id,
                    Title = m.Title,
                    Description = m.Description,
                    Date = m.Date,
                    Location = m.Location
                })
                .FirstOrDefaultAsync();

            if (meeting == null)
            {
                return NotFound();
            }

            return Ok(meeting);
        }
        [Authorize(Roles = "HR")]
        [HttpPost]
        public async Task<ActionResult<MeetingDto>> CreateMeeting(CreateMeetingDto request)
        {
            var meeting = new Meeting
            {
                Title = request.Title,
                Description = request.Description,
                Date = request.Date,
                Location = request.Location
            };

            _context.Meetings.Add(meeting);

            await _context.SaveChangesAsync();

            var response = new MeetingDto
            {
                Id = meeting.Id,
                Title = meeting.Title,
                Description = meeting.Description,
                Date = meeting.Date,
                Location = meeting.Location
            };

            return Ok(response);
        }
        [Authorize(Roles = "HR")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateMeeting(int id, UpdateMeetingDto request)
        {
            var meeting = await _context.Meetings.FindAsync(id);

            if (meeting == null)
            {
                return NotFound();
            }

            meeting.Title = request.Title;
            meeting.Description = request.Description;
            meeting.Date = request.Date;
            meeting.Location = request.Location;

            await _context.SaveChangesAsync();

            return NoContent();
        }
        [Authorize(Roles = "HR")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteMeeting(int id)
        {
            var meeting = await _context.Meetings.FindAsync(id);

            if (meeting == null)
            {
                return NotFound();
            }

            _context.Meetings.Remove(meeting);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}