using backend.Data;
using backend.DTOs.Resources;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResourcesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ResourcesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<ResourceDto>>> GetResources()
        {
            var resources = await _context.Resources
                .Select(r => new ResourceDto
                {
                    Id = r.Id,
                    Title = r.Title,
                    Description = r.Description,
                    Url = r.Url
                })
                .ToListAsync();

            return Ok(resources);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ResourceDto>> GetResource(int id)
        {
            var resource = await _context.Resources
                .Where(r => r.Id == id)
                .Select(r => new ResourceDto
                {
                    Id = r.Id,
                    Title = r.Title,
                    Description = r.Description,
                    Url = r.Url
                })
                .FirstOrDefaultAsync();

            if (resource == null)
            {
                return NotFound();
            }

            return Ok(resource);
        }

        [HttpPost]
        public async Task<ActionResult<ResourceDto>> CreateResource(CreateResourceDto request)
        {
            var resource = new Resource
            {
                Title = request.Title,
                Description = request.Description,
                Url = request.Url
            };

            _context.Resources.Add(resource);

            await _context.SaveChangesAsync();

            var response = new ResourceDto
            {
                Id = resource.Id,
                Title = resource.Title,
                Description = resource.Description,
                Url = resource.Url
            };

            return Ok(response);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateResource(int id, UpdateResourceDto request)
        {
            var resource = await _context.Resources.FindAsync(id);

            if (resource == null)
            {
                return NotFound();
            }

            resource.Title = request.Title;
            resource.Description = request.Description;
            resource.Url = request.Url;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResource(int id)
        {
            var resource = await _context.Resources.FindAsync(id);

            if (resource == null)
            {
                return NotFound();
            }

            _context.Resources.Remove(resource);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}