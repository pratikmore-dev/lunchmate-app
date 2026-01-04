using Lunchmate.DATA.Models;
using Lunchmate.Core;
using Lunchmate.DATA.Dtos;

namespace Lunchmate.Core.Services
{
    public interface IVendorMenuService 
    {
        Task<List<VendorMenuListResponse>> GetVendorMenus(Guid vendorId);
    }
}