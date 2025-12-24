using System.Text;
using Lunchmate.DATA.Data;
using Microsoft.EntityFrameworkCore;
using Lunchmate.Core.Services;
using Lunchmate.DATA.Repositories;
using Lunchmate.API.Controllers;
using Lunchmate.DATA.Models;
using AutoMapper;
using Lunchmate.Core.Mappers;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
// using Microsoft.OpenApi.Models;





var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
// builder.Services.AddOpenApi();

builder.Services.AddIdentity<User, Role>()
    .AddEntityFrameworkStores<LunchmateDbContext>()
    .AddDefaultTokenProviders();

builder.Services.AddAuthentication();
builder.Services.AddAuthorization();


// Register all services & repositories using Scrutor
builder.Services.Scan(scan => scan
    .FromAssemblies(
        typeof(FoodCategoryService).Assembly,
        typeof(FoodCategoryRepository).Assembly
    )
    .AddClasses(c => c.Where(t => t.Name.EndsWith("Service") || t.Name.EndsWith("Repository")))
    .AsImplementedInterfaces()
    .WithScopedLifetime()
);


builder.Services.AddScoped(typeof(ICrudService<>), typeof(CrudService<>));

// AutoMapper
//builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
var config = new MapperConfiguration(cfg =>
{
    cfg.AddProfile(new MappingProfile());
});

IMapper mapper = config.CreateMapper();

builder.Services.AddSingleton(mapper);

//dbcontext
builder.Services.AddDbContext<LunchmateDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("FrontendPolicy", policy =>
    {
        policy
            .WithOrigins("http://localhost:5173") // React dev server
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("FrontendPolicy");

app.MapControllers();

app.Run();

