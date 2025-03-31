using Microsoft.AspNetCore.Mvc;

namespace Notes_Backend.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class HealthController : ControllerBase
    {
        [HttpGet]
        public IActionResult CheckHealth()
        {
            return Ok("Backend is running");
        }
    }
}
