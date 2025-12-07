using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Lunchmate.DATA.Models;

namespace Lunchmate.DATA.Repositories
{
    public interface IFoodCategoryRepository : IRepository<FoodCategory>
    {
        // Task<bool> IsDuplicateAsync(string FoodCategoryName, Guid? excludeId = null);

    }
}