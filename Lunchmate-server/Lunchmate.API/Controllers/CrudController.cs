using Lunchmate.DATA.Dtos;
using Lunchmate.Core.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lunchmate.API.Controllers
{
    public class CrudController<TEntity, TCreateRequest, TUpdateRequest, TCreateResponse, TUpdateResponse> : LoggedInBaseController where TEntity : class
    {
        protected readonly ICrudService<TEntity> _crudService;

        public CrudController(ICrudService<TEntity> crudService)
        {
            this._crudService = crudService;
        }

        //[Authorize]
        [AllowAnonymous]
        [HttpGet]
        public virtual ActionResult<IEnumerable<TEntity>> GetAll()
        {
            var searchResult = _crudService.GetAll().AsEnumerable();
            return Ok(searchResult);
        }
        
        //[Authorize]
        [AllowAnonymous]
        [HttpGet("{id}")]
        public virtual async Task<ActionResult<TEntity>> Get(Guid id)
        {
            var result = await _crudService.GetById(id);

            if (result == null)
                return NotFound();

            return Ok(result);
        }

        //[Authorize]
        [AllowAnonymous]
        [HttpPost]
        public virtual async Task<ActionResult<Result<TCreateResponse>>> Create([FromBody] TCreateRequest product)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                else
                {
                    return GenerateCrudResponse<TCreateResponse>(await _crudService.Create<TCreateRequest, TCreateResponse>(product, LoggedInUser.UserID));
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[Authorize]
        [AllowAnonymous]
        [HttpPut("{id}")]
        public virtual async Task<ActionResult<Result<TUpdateResponse>>> Update(string id, [FromBody] TUpdateRequest product)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    return GenerateCrudResponse(await _crudService.Update<TUpdateRequest, TUpdateResponse>(product, id, LoggedInUser.UserID));
                }
                else
                {
                    return BadRequest(ModelState);
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //[Authorize]
        [AllowAnonymous]
        [HttpDelete("{id}")]
        public virtual async Task<ActionResult<Result<bool>>> Delete(string id)
        {
            try
            {
                return GenerateCrudResponse(await _crudService.Delete(new Guid(id)));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        protected ActionResult<Result<T>> GenerateCrudResponse<T>(Result<T> crudResult)
        {
            switch (crudResult.Status)
            {
                case ResultType.Success:
                    return Ok(crudResult);
                case ResultType.NotFound:
                    return NotFound(crudResult);
                default:
                    return BadRequest(crudResult);
            }
        }
    }
}
