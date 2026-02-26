using System.Reflection.Metadata.Ecma335;
using AutoMapper;
using Lunchmate.Core;
using Lunchmate.DATA.Dtos;
using Lunchmate.Core.Services;
using Lunchmate.DATA.Models;
using Lunchmate.DATA.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;



namespace Lunchmate.Core.Services
{
    public class OrderService : CrudService<Orders>, IOrderService
    {
        private readonly IOrderRepository _orderRepository;
        private readonly IMapper _mapper;

        public OrderService(IOrderRepository orderRepository, IMapper mapper) : base(orderRepository, mapper)
        {
            this._orderRepository = orderRepository;
            this._mapper = mapper;
        }
        

        public async Task<Result<CreateOrderResponse>> CreateOrderAsync(CreateOrderRequest orderDto, string createdBy)
        {
            try
            {
                // Validate
                if (orderDto.Items == null || !orderDto.Items.Any())
                {
                    return Result<CreateOrderResponse>.Failure("Order must contain at least one item");
                }

                // Business logic validations
                var calculatedTotal = orderDto.Items.Sum(i => i.Subtotal);
                if (Math.Abs(calculatedTotal - orderDto.TotalAmount) > 0.01m)
                {
                    return Result<CreateOrderResponse>.Failure("Total amount mismatch");
                }

                // Validate billing logic (50% split with ₹150 cap)
                var expectedEmployeeCut = Math.Min(orderDto.TotalAmount * 0.5m, 75m);
                var expectedCompanyCut = Math.Min(orderDto.TotalAmount * 0.5m, 75m);
                var expectedCashPaid = Math.Max(0, orderDto.TotalAmount - 150m);

                if (Math.Abs(orderDto.EmployeeCut - expectedEmployeeCut) > 0.01m ||
                    Math.Abs(orderDto.CompanyCut - expectedCompanyCut) > 0.01m ||
                    Math.Abs(orderDto.CashPaid - expectedCashPaid) > 0.01m)
                {
                    return Result<CreateOrderResponse>.Failure("Billing calculation is incorrect");
                }

                // Map DTO to Entity
                var order = new Orders
                {
                    UserID = createdBy,
                    OrderDate = orderDto.OrderDate,
                    TotalAmount = orderDto.TotalAmount,
                    EmployeeCut = orderDto.EmployeeCut,
                    CompanyCut = orderDto.CompanyCut,
                    CashPaid = orderDto.CashPaid,
                    CreatedDate = DateTime.Now,
                    CreatedBy = createdBy,
                    IsActive = true
                };

                var orderItems = orderDto.Items.Select(item => new OrderItems
                {
                    VendorMenuID = item.VendorMenuID,
                    Quantity = item.Quantity,
                    IsHalfPortion = item.IsHalfPortion,
                    ItemRate = item.ItemRate,
                    Subtotal = item.Subtotal,
                    CreatedDate = DateTime.Now,
                    CreatedBy = createdBy,
                    IsActive = true
                }).ToList();

                // Save to database
                var createdOrder = await _orderRepository.CreateOrderWithItemsAsync(order, orderItems);

                // Map to response
                var response = new CreateOrderResponse
                {
                    OrderID = createdOrder.OrderID
                };

                return Result<CreateOrderResponse>.Success(response);
            }
            catch (Exception ex)
            {
                return Result<CreateOrderResponse>.Failure(
                    "Failed to create order", 
                    new List<string> { ex.Message }
                );
            }
        }


    }
}