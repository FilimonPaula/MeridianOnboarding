using backend.Data;
using backend.DTOs.Auth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AuthController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestDto request)
        {
            var user = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == request.Email);

            if (user == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            if (user.PasswordHash != request.Password)
            {
                return Unauthorized("Invalid email or password.");
            }

            var response = new LoginResponseDto
            {
                Token = "temporary-token",
                Role = user.Role,
                FirstName = user.FirstName
            };

            return Ok(response);
        }
    }
}