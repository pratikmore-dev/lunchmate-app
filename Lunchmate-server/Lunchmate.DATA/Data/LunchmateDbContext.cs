using Microsoft.EntityFrameworkCore;
using Lunchmate.DATA;

namespace Lunchmate.DATA
{
    public class LunchmateDbContext : DbContext
    {
        public LunchmateDbContext(DbContextOptions<LunchmateDbContext> options) : base(options)
        {
        }

        // public DbSet<Employee> Employees { get; set; }
    }
}
