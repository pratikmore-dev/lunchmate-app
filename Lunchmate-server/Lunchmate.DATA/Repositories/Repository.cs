using Microsoft.EntityFrameworkCore;
using Lunchmate.DATA;
using Lunchmate.DATA.Dtos;
using Lunchmate.DATA.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Lunchmate.DATA.Repositories
{
    public class Repository<T> : IRepository<T> where T : class
    {
        private readonly DbContext _context;
        private readonly DbSet<T> _dbSet;

        public Repository(DbContext context)
        {
            _context = context;
            _dbSet = context.Set<T>();
        }

        public IQueryable<T> GetAll() => _context.Set<T>();
        public async Task<T> GetByIdAsync(object id) => await _dbSet.FindAsync(id);
        public async Task<T> AddAsync(T entity) { await _dbSet.AddAsync(entity); await _context.SaveChangesAsync(); return entity; }
        public async Task<T> UpdateAsync(T entity) { _dbSet.Update(entity); await _context.SaveChangesAsync(); return entity; }
        public async Task DeleteAsync(object id)
        {
            var entity = await _dbSet.FindAsync(id);
            if (entity != null)
            {
                _dbSet.Remove(entity);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<List<T>> GetByIdsAsync(IEnumerable<Guid> ids)
        {
            return await _dbSet
                .Where(e => ids.Contains(EF.Property<Guid>(e, "LunchmateID"))) // assumes primary key property is "Id"
                .ToListAsync();
        }

    }
}
