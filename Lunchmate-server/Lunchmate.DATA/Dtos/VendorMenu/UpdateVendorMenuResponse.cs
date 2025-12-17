using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Lunchmate.DATA.Dtos
{
    public class UpdateVendorMenuResponse
    {
       
         public Guid VendorMenuID { get; set; }
    }
}