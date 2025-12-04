// using Lunchmate.Data.Dtos;



// namespace Lunchmate.CORE.Services.CrudService
// {
//    namespace Lunchmate.Core.Services
// {
//     public interface ICrudService<TEntity> where TEntity : class
//     {
//         Task<TEntity> GetById(Guid Id);
//         IEnumerable<TEntity> GetAll();
//         Task<Result<TCreateResponse>> Create<TCreateRequest, TCreateResponse>(TCreateRequest input, string createdById);
//         Task<Result<TUpdateResponse>> Update<TUpdateRequest, TUpdateResponse>(TUpdateRequest input, string id, string updatedById);
//         Task<Result<bool>> Delete(Guid Id);
//     }
// }
// }