using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Lunchmate.DATA.Dtos
{
    public class OrderListResponse
    {
        
        public Guid OrderID{get; set;}


        [Required]
        public Guid VendorID{get; set;}

        [Required]
        public string UserID{get; set;} = string.Empty;

        [Required]
        public DateTime OrderDate{get; set;} = DateTime.Now;

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal TotalAmount { get; set; }

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal EmployeeCut { get; set; }  // 50% of amount (capped at ₹75)

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal CompanyCut { get; set; }  // 50% of amount (capped at ₹75)

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal CashPaid { get; set; }  // Excess over ₹150 limit


    }
}