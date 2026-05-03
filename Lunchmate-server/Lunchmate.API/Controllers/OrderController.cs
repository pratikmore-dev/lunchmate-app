using System.Runtime.CompilerServices;
using System.Security.Cryptography.X509Certificates;
using Lunchmate.Core.Services;
using Lunchmate.DATA.Data;
using Lunchmate.DATA.Dtos;
using Lunchmate.DATA.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;


namespace Lunchmate.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : CrudController<Orders, CreateOrderRequest, UpdateOrderRequest, CreateOrderResponse, UpdateOrderResponse>
    {
        private readonly IOrderService _orderService;
        private readonly ILogger<OrderController> _logger;
        private readonly LunchmateDbContext _context;

        public OrderController(IOrderService orderService, ILogger<OrderController> logger, LunchmateDbContext context) : base(orderService)
        {
            _orderService = orderService;
            _logger = logger;
            _context = context;
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

        [HttpGet("history")]
        public async Task<ActionResult<IEnumerable<OrderHistoryResponse>>> GetOrderHistory()
        {
            var orders = await _context.Orders
                .AsNoTracking()
                .OrderByDescending(order => order.OrderDate)
                .ToListAsync();

            var orderIds = orders.Select(order => order.OrderID).ToList();
            var orderItems = await _context.OrderItems
                .AsNoTracking()
                .Where(item => orderIds.Contains(item.OrderID))
                .Include(item => item.VendorMenu)
                    .ThenInclude(vendorMenu => vendorMenu!.Menu)
                .Include(item => item.VendorMenu)
                    .ThenInclude(vendorMenu => vendorMenu!.Vendor)
                .OrderBy(item => item.CreatedDate)
                .ToListAsync();

            var response = orders
                .Select(order => MapOrderHistoryResponse(order, orderItems.Where(item => item.OrderID == order.OrderID)))
                .ToList();

            return Ok(response);
        }

        [HttpGet("history/{id}")]
        public async Task<ActionResult<OrderHistoryResponse>> GetOrderHistoryDetails(Guid id)
        {
            var order = await _context.Orders
                .AsNoTracking()
                .FirstOrDefaultAsync(order => order.OrderID == id);

            if (order == null)
                return NotFound();

            var orderItems = await _context.OrderItems
                .AsNoTracking()
                .Where(item => item.OrderID == id)
                .Include(item => item.VendorMenu)
                    .ThenInclude(vendorMenu => vendorMenu!.Menu)
                .Include(item => item.VendorMenu)
                    .ThenInclude(vendorMenu => vendorMenu!.Vendor)
                .OrderBy(item => item.CreatedDate)
                .ToListAsync();

            return Ok(MapOrderHistoryResponse(order, orderItems));
        }

        private static OrderHistoryResponse MapOrderHistoryResponse(Orders order, IEnumerable<OrderItems> orderItems)
        {
            var items = orderItems.ToList();

            return new OrderHistoryResponse
            {
                OrderID = order.OrderID,
                OrderDate = order.OrderDate,
                TotalAmount = order.TotalAmount,
                EmployeeCut = order.EmployeeCut,
                CompanyCut = order.CompanyCut,
                CashPaid = order.CashPaid,
                TotalItems = items.Sum(item => item.Quantity),
                TotalVendors = items
                    .Where(item => item.VendorMenu != null)
                    .Select(item => item.VendorMenu!.VendorID)
                    .Distinct()
                    .Count(),
                Items = items.Select(item => new OrderHistoryItemResponse
                {
                    OrderItemID = item.OrderItemID,
                    VendorMenuID = item.VendorMenuID,
                    MenuID = item.VendorMenu?.MenuID ?? Guid.Empty,
                    MenuName = item.VendorMenu?.Menu?.MenuName ?? "Unknown item",
                    VendorID = item.VendorMenu?.VendorID ?? Guid.Empty,
                    VendorName = item.VendorMenu?.Vendor?.VendorName ?? "Unknown vendor",
                    Quantity = item.Quantity,
                    IsHalfPortion = item.IsHalfPortion,
                    ItemRate = item.ItemRate,
                    Subtotal = item.Subtotal
                }).ToList()
            };
        }
    }
}
