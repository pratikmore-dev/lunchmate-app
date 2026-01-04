using Lunchmate.Core.Services;
using Lunchmate.DATA.Dtos;
using Lunchmate.DATA.Models;
using Microsoft.AspNetCore.Mvc;


namespace Lunchmate.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendorMenuController : LoggedInBaseController
    {
        private readonly IVendorMenuService _vendorMenuService;
        private readonly ILogger<VendorMenuController> _logger;

        public VendorMenuController(IVendorMenuService vendorMenuService, ILogger<VendorMenuController> logger)
        {
            _vendorMenuService = vendorMenuService;
            _logger = logger;
        }

        [HttpGet("{vendorId}/menus")]
        public async Task<IActionResult> GetMenusByVendor(Guid vendorId)
        {
            var result = await _vendorMenuService.GetVendorMenus(vendorId);
            return Ok(result);
        }

    }
}