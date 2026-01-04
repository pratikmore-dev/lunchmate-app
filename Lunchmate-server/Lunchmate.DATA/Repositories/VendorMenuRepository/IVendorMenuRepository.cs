using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Lunchmate.DATA.Dtos;
using Lunchmate.DATA.Models;

namespace Lunchmate.DATA.Repositories
{
    public interface IVendorMenuRepository
    {
        // Task<bool> IsDuplicateAsync(string VendorMenuName, Guid? excludeId = null);
        Task<List<VendorMenuListResponse>> GetMenusByVendor(Guid vendorId);

    }
}