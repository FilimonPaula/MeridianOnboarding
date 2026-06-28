using backend.Data;
using backend.DTOs.Auth;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Services;
namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly JwtService _jwtService;
        public AuthController(AppDbContext context, JwtService jwtService)
        {
            _context = context;
            _jwtService = jwtService;
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
                Token = _jwtService.GenerateToken(user),
                Role = user.Role,
                FirstName = user.FirstName
            };
            return Ok(response);
        }
    }
}