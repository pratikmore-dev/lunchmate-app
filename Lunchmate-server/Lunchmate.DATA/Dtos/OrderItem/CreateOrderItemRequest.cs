using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Lunchmate.DATA.Dtos
{
    public class CreateOrderItemRequest
    {
        //  [Key]
        // [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        // public Guid OrderItemID{get; set;}

        [Required]
        public Guid VendorMenuID{get; set;}

        [Required]
        public Guid OrderID{get; set;}

        [Required]
        public int Quantity{get; set;}

        [Required]
        public bool IsHalfPortion{get; set;}= false;

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal ItemRate { get; set; }

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Subtotal { get; set; }  // Quantity × ItemRate

    }
}