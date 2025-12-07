using Lunchmate.DATA.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace Lunchmate.Core.Services
{
    public interface ICrudService<TEntity> where TEntity : class
    {
        Task<TEntity> GetById(Guid Id);
        IEnumerable<TEntity> GetAll();
        Task<Result<TCreateResponse>> Create<TCreateRequest, TCreateResponse>(TCreateRequest input);
        Task<Result<TUpdateResponse>> Update<TUpdateRequest, TUpdateResponse>(TUpdateRequest input, string id);
        Task<Result<bool>> Delete(Guid Id);
    }
}