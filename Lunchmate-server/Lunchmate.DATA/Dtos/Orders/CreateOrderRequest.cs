using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Lunchmate.DATA.Dtos
{
    public class CreateOrderRequest
    {

        [Required]
        public DateTime OrderDate { get; set; }

        [Required]
        public decimal TotalAmount { get; set; }

        [Required]
        public decimal EmployeeCut { get; set; }

        [Required]
        public decimal CompanyCut { get; set; }

        [Required]
        public decimal CashPaid { get; set; }

        [Required]
        public List<CreateOrderItemDto> Items { get; set; } = new List<CreateOrderItemDto>();
    }

    public class CreateOrderItemDto
    {
        [Required]
        public Guid VendorMenuID { get; set; }

        [Required]
        public int Quantity { get; set; }

        [Required]
        public bool IsHalfPortion { get; set; }

        [Required]
        public decimal ItemRate { get; set; }

        [Required]
        public decimal Subtotal { get; set; }
    }

    
}