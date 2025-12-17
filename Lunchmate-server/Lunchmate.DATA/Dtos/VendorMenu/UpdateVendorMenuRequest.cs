using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Lunchmate.DATA.Dtos
{
    public class UpdateVendorMenuRequest
    {
        [Required]
        public Guid VendorID { get; set; }

        [Required]
        public Guid MenuID { get; set; }

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal FullRate { get; set; }

        [Column(TypeName = "decimal(10,2)")]
        public decimal? HalfRate { get; set; }

        [Required]
        public bool IsAvailable { get; set; } = true;

        [MaxLength(500)]
        public string? VendorSpecificNotes { get; set; }
    }
}