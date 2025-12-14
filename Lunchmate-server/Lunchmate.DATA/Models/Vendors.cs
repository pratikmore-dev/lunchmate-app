using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Lunchmate.DATA.Models
{
    public class Vendors
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid VendorID  { get; set; }

        [Required]
        [MaxLength(100)]
        public string FoodCategoryName { get; set; }= string.Empty;


        [Required]
        [MaxLength(200)]
        public string VendorName { get; set; } = string.Empty;

        [Required]
        [MaxLength(500)]
        public string Address { get; set; } = string.Empty;

        [Required]
        [MaxLength(15)]
        [Phone]
        public string Phone { get; set; } 

        [Required]
        [MaxLength(150)]
        [EmailAddress]
        public string? Email { get; set; } 

        // Foreign Key to User (IdentityUser)
        [Required]
        public string OwnerID { get; set; } = string.Empty;  // IdentityUser uses string ID

        // Navigation Property
        [ForeignKey("OwnerID")]
        public User? Owner { get; set; }

        // For future: Menu items this vendor sells
        // public ICollection<VendorMenu>? VendorMenus { get; set; }

        // For future: Orders placed at this vendor
        // public ICollection<Order>? Orders { get; set; }


        public DateTime CreatedDate { get; set; }= DateTime.Now;
        [StringLength(100)]
        public string CreatedBy { get; set; }= "System";
        [StringLength(100)]
        public string? LastModifiedBy { get; set; }
        public DateTime? LastModifiedDate { get; set; }

        public bool? IsActive { get; set; }
    }
}