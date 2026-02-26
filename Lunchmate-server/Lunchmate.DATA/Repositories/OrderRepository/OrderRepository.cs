using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Lunchmate.DATA.Models;
using Lunchmate.DATA.Data;

namespace Lunchmate.DATA.Repositories
{
    public class OrderRepository : Repository<Orders>, IOrderRepository
    {
        private readonly LunchmateDbContext _context;

        public OrderRepository(LunchmateDbContext context ) : base(context)
        {
            _context = context;
        }

         public async Task<Orders> CreateOrderWithItemsAsync(Orders order, List<OrderItems> orderItems)
        {
            // Use a transaction to ensure atomicity
            using var transaction = await _context.Database.BeginTransactionAsync();
            
            try
            {
                // Add order
                await _context.Orders.AddAsync(order);
                await _context.SaveChangesAsync();

                // Set OrderID for all items
                foreach (var item in orderItems)
                {
                    item.OrderID = order.OrderID;
                }

                // Add all items
                await _context.OrderItems.AddRangeAsync(orderItems);
                await _context.SaveChangesAsync();

                // Commit transaction
                await transaction.CommitAsync();

                return order;
            }
            catch (Exception)
            {
                // Rollback on error
                await transaction.RollbackAsync();
                throw;
            }
        }

        // public async Task<bool> IsDuplicateAsync(string softwareTypeName, Guid? excludeId = null)
        // {
        //     if (string.IsNullOrWhiteSpace(softwareTypeName))
        //         return false;

        //     var normalizedName = softwareTypeName.Trim().ToLower();

        //     return await _context.SoftwareTypes
        //         .Where(c => c.SoftwareTypeName.Trim().ToLower() == normalizedName)
        //         .Where(c => !excludeId.HasValue || c.SoftwareTypeId != excludeId.Value)
        //         .AnyAsync();
        // }
       
    }

}