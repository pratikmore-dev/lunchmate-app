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
        private readonly IOrderService _OrderService;
        private readonly ILogger<OrderController> _logger;

        public OrderController(IOrderService OrderService, ILogger<OrderController> logger) : base(OrderService)
        {
            _OrderService = OrderService;
            _logger = logger;
        }
    }
}