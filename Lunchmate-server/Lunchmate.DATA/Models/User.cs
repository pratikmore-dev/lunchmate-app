using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;


namespace Lunchmate.DATA.Models
{
    public class User : IdentityUser
    {
       public string FirstName { get; set; }
        public string LastName { get; set; }

        public string? EmployeeID { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime CreatedOn { get; set; } = DateTime.UtcNow;
        public string CreatedBy { get; set; } = "System";

        public DateTime? ModifiedOn { get; set; }
        public string? ModifiedBy { get; set; }
    }
}