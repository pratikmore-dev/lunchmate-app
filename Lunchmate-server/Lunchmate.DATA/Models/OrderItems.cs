using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Identity.Client;

namespace Lunchmate.DATA.Models
{
    public class OrderItems
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid OrderItemID{get; set;}

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

        // Navigation Properties
        [ForeignKey("OrderID")]
        public Orders? Order { get; set; }

        [ForeignKey("VendorMenuID")]
        public VendorMenu? VendorMenu { get; set; }



        public DateTime CreatedDate {get; set;} = DateTime.Now;
        [StringLength(100)]

        public string CreatedBy{get; set;}= "System";
        [StringLength(100)]

        public DateTime? LastModiedDate{get; set;}

        public string? LastModiedBy {get; set;}

        public bool? IsActive{get; set;}
    }
}