using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Identity.Client;

namespace Lunchmate.DATA.Models
{
    public class Orders
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid OrderID{get; set;}

        // [Required]
        // public Guid OrderItemID{get; set;}
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

        // Navigation Properties
        [ForeignKey("UserID")]
        public User? User { get; set; }

        [ForeignKey("VendorID")]
        public Vendors? Vendor { get; set; }

        public ICollection<OrderItems>? OrderItems { get; set; }

        public DateTime CreatedDate {get; set;} = DateTime.Now;
        [StringLength(100)]

        public string CreatedBy{get; set;}= "System";
        [StringLength(100)]

        public DateTime? LastModiedDate{get; set;}

        public string? LastModiedBy {get; set;}

        public bool? IsActive{get; set;}
    }
}