using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Lunchmate.DATA.Models;
using Lunchmate.DATA.Data;
using Lunchmate.DATA.Dtos;

namespace Lunchmate.DATA.Repositories
{
    public class VendorMenuRepository : IVendorMenuRepository
    {
        private readonly LunchmateDbContext _context;

        public VendorMenuRepository(LunchmateDbContext context)
        {
            _context = context;
        }

public async Task<List<VendorMenuListResponse>> GetMenusByVendor(Guid vendorId)
{
    // 1️⃣ Build the query (deferred execution)
    var query =
        from vm in _context.VendorMenu
        join m in _context.Menu on vm.MenuID equals m.MenuID
        where vm.VendorID == vendorId
              && vm.IsAvailable
              && (vm.IsActive == true || vm.IsActive == null)
        select new VendorMenuListResponse
        {
            VendorMenuID = vm.VendorMenuID,
            MenuID = vm.MenuID,
            MenuName = m.MenuName,
            FullRate = vm.FullRate,
            HalfRate = vm.HalfRate,
            IsAvailable = vm.IsAvailable,
            VendorSpecificNotes = vm.VendorSpecificNotes
        };

    // 🔴 BREAKPOINT HERE
    // Hover on `query` → you will see expression tree (not data)

    // 2️⃣ Execute query and materialize data
    var result = await query.ToListAsync();

    // 🔴 BREAKPOINT HERE
    // Hover on `result` → you will see all records with MenuName populated

    return result;
}
    }}