using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Lunchmate.DATA.Models;

namespace Lunchmate.DATA.Repositories
{
    public interface IMenuRepository : IRepository<Menu>
    {
        // Task<bool> IsDuplicateAsync(string FoodCategoryName, Guid? excludeId = null);
        IQueryable<Menu> GetAll();
    }
}