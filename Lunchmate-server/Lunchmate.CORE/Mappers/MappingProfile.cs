using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using AutoMapper;
using Lunchmate.DATA.Models;
using Lunchmate.DATA.Dtos;
    

namespace Lunchmate.Core.Mappers
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CreateFoodCategoryRequest, Lunchmate.DATA.Models.FoodCategory>();
            CreateMap<UpdateFoodCategoryRequest, Lunchmate.DATA.Models.FoodCategory>();
            CreateMap<Lunchmate.DATA.Models.FoodCategory,CreateFoodCategoryResponse>();
            CreateMap<Lunchmate.DATA.Models.FoodCategory,  UpdateFoodCategoryResponse>();
            CreateMap<Lunchmate.DATA.Models.FoodCategory, FoodCategoryListResponse>();

        }
    }
}