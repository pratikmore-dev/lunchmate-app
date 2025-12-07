using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Lunchmate.DATA.Dtos
{
    public class CreateFoodCategoryResponse
    {
        public int FoodCategoryID { get; set; }
        [MaxLength(100)]
        public string FoodCategoryName { get; set; }

        [MaxLength(500)]
        public string? Description { get; set; }

        public DateTime? CreatedDate { get; set; }
        [StringLength(100)]
        public string? CreatedBy { get; set; }
        [StringLength(100)]
        public string? LastModifiedBy { get; set; }
        public DateTime? LastModifiedDate { get; set; }

        public bool? IsActive { get; set; }


    }
}