using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Lunchmate.DATA.Dtos
{
    public class VendorMenuListResponse
    {
    public Guid VendorMenuID { get; set; }
    public Guid MenuID { get; set; }
    public string? MenuName { get; set; }
    public decimal FullRate { get; set; }
    public decimal? HalfRate { get; set; }
    public bool IsAvailable { get; set; }
    public string? VendorSpecificNotes { get; set; }


    }
}