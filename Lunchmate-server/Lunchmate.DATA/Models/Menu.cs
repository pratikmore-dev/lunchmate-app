using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Lunchmate.DATA.Models
{
    public class Menu
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public Guid MenuID  { get; set; }

       [Required]
        [MaxLength(200)]
        public string MenuName { get; set; } = string.Empty;

        [Required]
        public Guid FoodCategoryID { get; set; }

        [MaxLength(1000)]
        public string? Description { get; set; }

        [Required]
        public bool IsHalfAvailable { get; set; } = false;

        // Foreign Key Navigation
        [ForeignKey("FoodCategoryID")]
        public FoodCategory? FoodCategory { get; set; }

        // Navigation property - which vendors sell this item
        // public ICollection<VendorMenu>? VendorMenus { get; set; }

        public DateTime CreatedDate { get; set; }= DateTime.Now;
        [StringLength(100)]
        public string CreatedBy { get; set; }= "System";
        [StringLength(100)]
        public string? LastModifiedBy { get; set; }
        public DateTime? LastModifiedDate { get; set; }

        public bool? IsActive { get; set; }
    }
}