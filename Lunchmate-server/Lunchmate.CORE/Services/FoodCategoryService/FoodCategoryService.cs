using System.Reflection.Metadata.Ecma335;
using AutoMapper;
using Lunchmate.Core;
using Lunchmate.DATA.Dtos;
using Lunchmate.Core.Services;
using Lunchmate.DATA.Models;
using Lunchmate.DATA.Repositories;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;



namespace Lunchmate.Core.Services
{
    public class FoodCategoryService : CrudService<FoodCategory>, IFoodCategoryService
    {
        private readonly IFoodCategoryRepository _FoodCategoryRepository;
        //private readonly IMapper _mapper;

        public FoodCategoryService(IFoodCategoryRepository FoodCategoryRepository, IMapper mapper) : base(FoodCategoryRepository, mapper)
        {
            this._FoodCategoryRepository = FoodCategoryRepository;
        }
        



    }
}