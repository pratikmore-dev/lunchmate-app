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
    public class OrderService : CrudService<Orders>, IOrderService
    {
        private readonly IOrderRepository _OrderRepository;
        //private readonly IMapper _mapper;

        public OrderService(IOrderRepository OrderRepository, IMapper mapper) : base(OrderRepository, mapper)
        {
            this._OrderRepository = OrderRepository;
        }
        



    }
}