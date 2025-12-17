using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Lunchmate.DATA.Models;

namespace Lunchmate.DATA.Repositories
{
    public interface IOrderItemRepository : IRepository<OrderItems>
    {
        // Task<bool> IsDuplicateAsync(string OrderItemName, Guid? excludeId = null);

    }
}