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
    public class MenuService : CrudService<Menu>, IMenuService
    {
        private readonly IMenuRepository _MenuRepository;
        //private readonly IMapper _mapper;

        public MenuService(IMenuRepository MenuRepository, IMapper mapper) : base(MenuRepository, mapper)
        {
            this._MenuRepository = MenuRepository;
        }
        



    }
}