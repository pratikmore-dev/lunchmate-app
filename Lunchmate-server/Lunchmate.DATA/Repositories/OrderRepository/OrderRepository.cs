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

        public OrderRepository(LunchmateDbContext context) : base(context)
        {
            _context = context;
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