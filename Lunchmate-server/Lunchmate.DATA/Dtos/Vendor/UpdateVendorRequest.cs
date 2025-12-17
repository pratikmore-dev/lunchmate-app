using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Lunchmate.DATA.Dtos
{
    public class UpdateVendorRequest
    {
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

    }
}