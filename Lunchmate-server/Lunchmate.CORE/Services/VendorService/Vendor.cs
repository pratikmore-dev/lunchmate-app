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
    public class VendorService : CrudService<Vendors>, IVendorService
    {
        private readonly IVendorRepository _VendorRepository;
        //private readonly IMapper _mapper;

        public VendorService(IVendorRepository VendorRepository, IMapper mapper) : base(VendorRepository, mapper)
        {
            this._VendorRepository = VendorRepository;
        }
        



    }
}