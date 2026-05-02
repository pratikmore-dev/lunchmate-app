using Lunchmate.Core.Services;
using Lunchmate.DATA.Dtos;
using Lunchmate.DATA.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace Lunchmate.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MenuController : LoggedInBaseController
    {
        private readonly IMenuService _MenuService;
        private readonly ILogger<MenuController> _logger;
        private const string SystemUserId = "System";

        public MenuController(IMenuService MenuService, ILogger<MenuController> logger)
        {
            _MenuService = MenuService;
            _logger = logger;
        }

        [AllowAnonymous]
        [HttpGet]
        public ActionResult<IEnumerable<FoodMenuResponse>> GetAll()
        {
            var menus = _MenuService.GetAll()
                .AsEnumerable()
                .Select(MapMenuResponse)
                .ToList();

            return Ok(menus);
        }

        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<FoodMenuResponse>> Get(Guid id)
        {
            var menu = await _MenuService.GetById(id);

            if (menu == null)
                return NotFound();

            return Ok(MapMenuResponse(menu));
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult<Result<CreateMenuResponse>>> Create([FromBody] CreateMenuRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                return GenerateCrudResponse(await _MenuService.Create<CreateMenuRequest, CreateMenuResponse>(request, SystemUserId));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating menu");
                return BadRequest(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpPut("{id}")]
        public async Task<ActionResult<Result<UpdateMenuResponse>>> Update(string id, [FromBody] UpdateMenuRequest request)
        {
            try
            {
                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                return GenerateCrudResponse(await _MenuService.Update<UpdateMenuRequest, UpdateMenuResponse>(request, id, SystemUserId));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating menu {MenuId}", id);
                return BadRequest(ex.Message);
            }
        }

        [AllowAnonymous]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Result<bool>>> Delete(string id)
        {
            try
            {
                return GenerateCrudResponse(await _MenuService.Delete(new Guid(id)));
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting menu {MenuId}", id);
                return BadRequest(ex.Message);
            }
        }

        private static FoodMenuResponse MapMenuResponse(Menu menu)
        {
            return new FoodMenuResponse
            {
                MenuID = menu.MenuID,
                MenuName = menu.MenuName,
                FoodCategoryID = menu.FoodCategoryID,
                Description = menu.Description,
                IsHalfAvailable = menu.IsHalfAvailable,
                CreatedDate = menu.CreatedDate,
                CreatedBy = menu.CreatedBy,
                LastModifiedBy = menu.LastModifiedBy,
                LastModifiedDate = menu.LastModifiedDate,
                IsActive = menu.IsActive,
                FoodCategory = menu.FoodCategory == null ? null : new FoodCategoryListResponse
                {
                    FoodCategoryID = menu.FoodCategory.FoodCategoryID,
                    FoodCategoryName = menu.FoodCategory.FoodCategoryName,
                    Description = menu.FoodCategory.Description,
                    CreatedDate = menu.FoodCategory.CreatedDate,
                    CreatedBy = menu.FoodCategory.CreatedBy,
                    LastModifiedBy = menu.FoodCategory.LastModifiedBy,
                    LastModifiedDate = menu.FoodCategory.LastModifiedDate,
                    IsActive = menu.FoodCategory.IsActive
                }
            };
        }

        private ActionResult<Result<T>> GenerateCrudResponse<T>(Result<T> crudResult)
        {
            switch (crudResult.Status)
            {
                case ResultType.Success:
                    return Ok(crudResult);
                case ResultType.NotFound:
                    return NotFound(crudResult);
                default:
                    return BadRequest(crudResult);
            }
        }
    }
}
