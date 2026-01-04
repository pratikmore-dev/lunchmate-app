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
    public class VendorMenuService :  IVendorMenuService
    {
        private readonly IVendorMenuRepository _VendorMenuRepository;
        //private readonly IMapper _mapper;

        public VendorMenuService(IVendorMenuRepository VendorMenuRepository, IMapper mapper) 
        {
            this._VendorMenuRepository = VendorMenuRepository;
        }
        

        public async Task<List<VendorMenuListResponse>> GetVendorMenus(Guid vendorId)
        {
           
             var data=await _VendorMenuRepository.GetMenusByVendor(vendorId);
              return data;
        }

    }
}