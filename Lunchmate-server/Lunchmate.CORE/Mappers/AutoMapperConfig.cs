using AutoMapper;
using Microsoft.Extensions.DependencyInjection;

namespace Lunchmate.Core.Mappers
{
    //public static class AutoMapperConfig
    //{
    //    public static void AddAutoMapperConfiguration(this IServiceCollection services)
    //    {
    //        services.AddAutoMapper(typeof(MappingProfile));
    //    }
    //}

    public class AutoMapperConfig
    {
        public static IMapper Mapper;
        public static void ConfigureAutoMapper()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new MappingProfile());
            });

            Mapper = config.CreateMapper();
        }
    }
}