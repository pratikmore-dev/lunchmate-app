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
    public class OrderItemService : CrudService<OrderItems>, IOrderItemService
    {
        private readonly IOrderItemRepository _OrderItemRepository;
        //private readonly IMapper _mapper;

        public OrderItemService(IOrderItemRepository OrderItemRepository, IMapper mapper) : base(OrderItemRepository, mapper)
        {
            this._OrderItemRepository = OrderItemRepository;
        }
        



    }
}