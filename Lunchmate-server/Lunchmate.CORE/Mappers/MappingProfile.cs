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
            // FoodCategory mappings
            CreateMap<CreateFoodCategoryRequest, Lunchmate.DATA.Models.FoodCategory>();
            CreateMap<UpdateFoodCategoryRequest, Lunchmate.DATA.Models.FoodCategory>();
            CreateMap<Lunchmate.DATA.Models.FoodCategory,CreateFoodCategoryResponse>();
            CreateMap<Lunchmate.DATA.Models.FoodCategory,  UpdateFoodCategoryResponse>();
            CreateMap<Lunchmate.DATA.Models.FoodCategory, FoodCategoryListResponse>();

            // Menu mappings
            CreateMap<CreateMenuRequest, Lunchmate.DATA.Models.Menu>();
            CreateMap<UpdateMenuRequest, Lunchmate.DATA.Models.Menu>();
            CreateMap<Lunchmate.DATA.Models.Menu,CreateMenuResponse>();
            CreateMap<Lunchmate.DATA.Models.Menu,  UpdateMenuResponse>();
            CreateMap<Lunchmate.DATA.Models.Menu, FoodCategoryListResponse>();

            // OrderItem mappings
            CreateMap<CreateOrderItemRequest, OrderItems>();
            CreateMap<UpdateOrderItemRequest, OrderItems>();
            CreateMap<OrderItems,CreateOrderItemResponse>();
            CreateMap<OrderItems,  UpdateOrderItemResponse>();
            CreateMap<OrderItems, OrderItemListResponse>();

            // Orders mappings
            CreateMap<CreateOrderRequest, Orders>();
            CreateMap<UpdateOrderRequest, Orders>();
            CreateMap<Orders,CreateOrderResponse>();
            CreateMap<Orders,  UpdateOrderResponse>();
            CreateMap<Orders, OrderListResponse>();

            // VendorMenu mappings
            CreateMap<CreateVendorMenuRequest, VendorMenu>();
            CreateMap<UpdateVendorMenuRequest, VendorMenu>();
            CreateMap<VendorMenu,CreateVendorMenuResponse>();
            CreateMap<VendorMenu,  UpdateVendorMenuResponse>();
            CreateMap<VendorMenu, VendorMenuListResponse>();


            // Vendor mappings
            CreateMap<CreateVendorRequest, Vendors>();
            CreateMap<UpdateVendorRequest, Vendors>();
            CreateMap<Vendors,CreateVendorResponse>();
            CreateMap<Vendors,  UpdateVendorResponse>();
            CreateMap<Vendors, VendorListResponse>();
        }
    }
}