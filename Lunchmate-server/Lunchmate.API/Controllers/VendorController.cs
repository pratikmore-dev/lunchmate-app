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
    public class VendorController : CrudController<Vendors, CreateVendorRequest, UpdateVendorRequest, CreateVendorResponse, UpdateVendorResponse>
    {
        private readonly IVendorService _VendorService;
        private readonly ILogger<VendorController> _logger;

        public VendorController(IVendorService VendorService, ILogger<VendorController> logger) : base(VendorService)
        {
            _VendorService = VendorService;
            _logger = logger;
        }
    }
}