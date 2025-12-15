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
    public class FoodCategoryController : CrudController<FoodCategory, CreateFoodCategoryRequest, UpdateFoodCategoryRequest, CreateFoodCategoryResponse, UpdateFoodCategoryResponse>
    {
        private readonly IFoodCategoryService _foodCategoryService;
        private readonly ILogger<FoodCategoryController> _logger;

        public FoodCategoryController(IFoodCategoryService foodCategoryService, ILogger<FoodCategoryController> logger) : base(foodCategoryService)
        {
            _foodCategoryService = foodCategoryService;
            _logger = logger;
        }
    }
}