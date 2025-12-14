using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Lunchmate.DATA;
using Lunchmate.DATA.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Lunchmate.DATA.Data
{
    public class LunchmateDbContext : IdentityDbContext<User, Role, string>
    {
        public LunchmateDbContext(DbContextOptions<LunchmateDbContext> options) : base(options)
        {
        }

        public DbSet<FoodCategory> FoodCategory { get; set; }
    }
}
