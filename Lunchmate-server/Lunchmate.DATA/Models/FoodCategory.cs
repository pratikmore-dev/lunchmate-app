using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Lunchmate.DATA.Models
{
    public class FoodCategory
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int FoodCategoryID { get; set; }

        [Required]
        [MaxLength(100)]
        public string FoodCategoryName { get; set; }

        [MaxLength(500)]
        public string? Description { get; set; }

        // Navigation property for related FoodItems
        //  public ICollection<Menu>? Menus { get; set; }

        public DateTime CreatedDate { get; set; }= DateTime.Now;
        [StringLength(100)]
        public string CreatedBy { get; set; }= "System";
        [StringLength(100)]
        public string? LastModifiedBy { get; set; }
        public DateTime? LastModifiedDate { get; set; }

        public bool? IsActive { get; set; }
    }
}