using Moq;
using NUnit.Framework;
using AutoMapper;
using Lunchmate.Core.Services;
using Lunchmate.DATA.Repositories;
using Lunchmate.DATA.Dtos;

namespace Lunchmate.Tests;

[TestFixture]
public class OrderServiceTests
{
    private OrderService _orderService;
    private Mock<IOrderRepository> _mockOrderRepository;
    private Mock<IMapper> _mockMapper;

    [SetUp]
    public void Setup()
    {
        _mockOrderRepository = new Mock<IOrderRepository>();
        _mockMapper = new Mock<IMapper>();

        _orderService = new OrderService(
            _mockOrderRepository.Object,
            _mockMapper.Object
        );
    }

[Test]
public async Task CreateOrderAsync_EmptyItems_ReturnsFailure()
{
    var request = new CreateOrderRequest
    {
        Items = new List<CreateOrderItemDto>(),
        TotalAmount = 100
    };

    var result = await _orderService.CreateOrderAsync(request, "testuser");

    Assert.That(result, Is.Not.Null);
}
}