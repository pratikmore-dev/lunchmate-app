using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;


namespace Lunchmate.DATA.Models
{
    public class Role : IdentityRole
    {
        public string RoleShortName { get; set; }

        [Required]
        public DateTime CreatedOn { get; set; } = DateTime.Now;

        [Required]
        [MaxLength(100)]
        public string CreatedBy { get; set; } = "System";

        public DateTime? ModifiedOn { get; set; }

        [MaxLength(100)]
        public string? ModifiedBy { get; set; }

        [Required]
        public bool IsActive { get; set; } = true;
    }

}