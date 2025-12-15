using System.Runtime.CompilerServices;
using System.Security.Cryptography.X509Certificates;
using Lunchmate.Core.Services;
using Lunchmate.DATA.Dtos;
using Lunchmate.DATA.Models;
using Microsoft.AspNetCore.Mvc;


namespace Lunchmate.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : CrudController<Menu, CreateMenuRequest, UpdateMenuRequest, CreateMenuResponse, UpdateMenuResponse>
    {
        private readonly IMenuService _MenuService;
        private readonly ILogger<MenuController> _logger;

        public MenuController(IMenuService MenuService, ILogger<MenuController> logger) : base(MenuService)
        {
            _MenuService = MenuService;
            _logger = logger;
        }
    }
}