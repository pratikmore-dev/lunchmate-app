using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Lunchmate.DATA.Dtos
{
    public class CreateMenuRequest
    {
        [Required]
        [MaxLength(200)]
        public required string MenuName { get; set; }

        [Required]
        public required Guid FoodCategoryID { get; set; }

        [MaxLength(1000)]
        public string? Description { get; set; }

        [Required]
        public bool IsHalfAvailable { get; set; } 

        public DateTime CreatedDate { get; set; }= DateTime.Now;
        
        [StringLength(100)]
        public string CreatedBy { get; set; }= "System";


    }
}