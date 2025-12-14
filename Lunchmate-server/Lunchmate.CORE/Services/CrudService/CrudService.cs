using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Lunchmate.DATA.Dtos;
using Lunchmate.Core.Services;
using Lunchmate.DATA.Repositories;


namespace Lunchmate.Core.Services
{
    public class CrudService<TEntity> : ICrudService<TEntity> where TEntity : class
    {
        public IRepository<TEntity> _repository;

        protected readonly IMapper _mapper;
        public CrudService(IRepository<TEntity> repository, IMapper mapper)
        {
            this._repository = repository;
            this._mapper = mapper;
        }

        public virtual async Task<Result<TCreateResponse>> Create<TCreateRequest, TCreateResponse>(TCreateRequest input, string createdById)
        {
            var model = _mapper.Map<TEntity>(input);

            var createdByProp = model.GetType().GetProperty("CreatedBy");
            if (createdByProp != null && createdByProp.CanWrite)
                createdByProp.SetValue(model, createdById);

            var createdOnProp = model.GetType().GetProperty("CreatedDate");
            if (createdOnProp != null && createdOnProp.CanWrite)
                createdOnProp.SetValue(model, DateTime.UtcNow);

            model = await _repository.AddAsync(model);
            var response = _mapper.Map<TCreateResponse>(model);

            return new Result<TCreateResponse>(ResultType.Success, "Created", response);
        }

        public virtual async Task<Result<TUpdateResponse>> Update<TUpdateRequest, TUpdateResponse>(TUpdateRequest input, string id, string updatedById)
        {
            TEntity model = await GetById(new Guid(id));

            if (model == null)
                return new Result<TUpdateResponse>(ResultType.NotFound, "Not Found", _mapper.Map<TEntity, TUpdateResponse>(model));

            if (model.GetType().GetProperty("LastModifiedBy") != null)
                 model.GetType().GetProperty("LastModifiedBy").SetValue(model, updatedById);

            if (model.GetType().GetProperty("LastModifiedDate") != null)
                model.GetType().GetProperty("LastModifiedDate").SetValue(model, System.DateTime.UtcNow);

            _mapper.Map<TUpdateRequest, TEntity>(input, model);



            model = await _repository.UpdateAsync(model);
            return new Result<TUpdateResponse>(ResultType.Success, "Updated", _mapper.Map<TEntity, TUpdateResponse>(model));
        }

        public virtual IEnumerable<TEntity> GetAll()
        {
            return this._repository.GetAll();
        }

        public virtual async Task<TEntity> GetById(Guid Id)
        {
            return await _repository.GetByIdAsync(Id);
        }

        public virtual async Task<Result<bool>> Delete(Guid Id)
        {
            await _repository.DeleteAsync(Id);
            return new Result<bool>(ResultType.Success, "Deleted", true);
        }
    }

}