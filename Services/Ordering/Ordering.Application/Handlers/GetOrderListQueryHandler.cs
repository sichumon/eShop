using AutoMapper;
using MediatR;
using Ordering.Application.Commands;
using Ordering.Application.Queries;
using Ordering.Domain.Repositories;

namespace Ordering.Application.Handlers;

public class GetOrderListQueryHandler : IRequestHandler<GetOrdersListQuery, List<OrderResponse>>
{
    private readonly IOrderRepository _orderRepository;
    private readonly IMapper _mapper;

    public GetOrderListQueryHandler(IOrderRepository orderRepository, IMapper mapper)
    {
        _orderRepository = orderRepository;
        _mapper = mapper;
    }
    public async Task<List<OrderResponse>> Handle(GetOrdersListQuery request, CancellationToken cancellationToken)
    {
        var orderList = await _orderRepository.GetOrdersByUserName(request.UserName);
        return _mapper.Map<List<OrderResponse>>(orderList);
    }
}