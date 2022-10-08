using AutoMapper;
using Ordering.Application.Commands;
using Ordering.Domain.Entities;

namespace Ordering.Application.Mappers;

public class OrderMappingProfile : Profile
{
    public OrderMappingProfile()
    {
        CreateMap<Order, OrderResponse>().ReverseMap();
        CreateMap<Order, CheckoutOrderCommand>().ReverseMap();
        CreateMap<Order, UpdateOrderCommand>().ReverseMap();
    }
}