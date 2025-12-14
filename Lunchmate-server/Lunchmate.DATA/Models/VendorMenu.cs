using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Lunchmate.DATA.Models
{
    public class VendorMenu
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid VendorMenuID  { get; set; }

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

        // Foreign Key Navigations
        [ForeignKey("VendorID")]
        public Vendors? Vendor { get; set; }

        [ForeignKey("MenuID")]
        public Menu? Menu { get; set; }

        // Navigation for future OrderItems
        // public ICollection<OrderItem>? OrderItems { get; set; }

        public DateTime CreatedDate { get; set; }= DateTime.Now;
        [StringLength(100)]
        public string CreatedBy { get; set; }= "System";
        [StringLength(100)]
        public string? LastModifiedBy { get; set; }
        public DateTime? LastModifiedDate { get; set; }

        public bool? IsActive { get; set; }
    }
}