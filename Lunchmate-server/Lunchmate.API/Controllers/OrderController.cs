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
    public class OrderController : CrudController<Orders, CreateOrderRequest, UpdateOrderRequest, CreateOrderResponse, UpdateOrderResponse>
    {
        private readonly IOrderService _orderService;
        private readonly ILogger<OrderController> _logger;

        public OrderController(IOrderService orderService, ILogger<OrderController> logger) : base(orderService)
        {
            _orderService = orderService;
            _logger = logger;
        }

        //  [HttpPost]
        // public async Task<IActionResult> CreateOrder([FromBody] CreateOrderRequest request)
        // {
        //     if (!ModelState.IsValid)
        //     {
        //         return BadRequest(ModelState);
        //     }

        //     // Get current user from claims/auth
        //     var createdBy = "8f5c2c88-6d88-4d1f-9b6e-4c3eaf1c9a21";

        //     var result = await _orderService.CreateOrderAsync(request, createdBy);

        //     return result.Status switch
        //     {
        //         ResultType.Success => Ok(result),
        //         ResultType.Fail => BadRequest(result),
        //         _ => StatusCode(500, result)
        //     };
        // }

        [HttpPost("place-order")]
public  async Task<IActionResult> PlaceOrder([FromBody] CreateOrderRequest request)
{
    try
    {

        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var createdBy = "8f5c2c88-6d88-4d1f-9b6e-4c3eaf1c9a21";
        
        var result = await _orderService.CreateOrderAsync(request, createdBy);
        

        return result.Status switch
        {
            ResultType.Success => Ok(result),
            ResultType.Fail => BadRequest(result),
            _ => StatusCode(500, result)
        };
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { message = ex.Message, stackTrace = ex.StackTrace });
    }
}
    }
}