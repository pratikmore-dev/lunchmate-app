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
        public DbSet<Menu> Menu { get; set; }
        public DbSet<Vendors> Vendors { get; set; }  
        public DbSet<VendorMenu> VendorMenu { get; set; }
        public DbSet<Orders> Orders { get; set; }
        public DbSet<OrderItems> OrderItems { get; set;}

         protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // FIX: Disable cascade delete to prevent multiple cascade paths
            modelBuilder.Entity<Orders>()
                .HasOne(o => o.Vendor)
                .WithMany()
                .HasForeignKey(o => o.VendorID)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Orders>()
                .HasOne(o => o.User)
                .WithMany()
                .HasForeignKey(o => o.UserID)
                .OnDelete(DeleteBehavior.Restrict);

            // Unique constraint
            modelBuilder.Entity<VendorMenu>()
                .HasIndex(vm => new { vm.VendorID, vm.MenuID })
                .IsUnique();
        }
    }
}
