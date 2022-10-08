using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using Ordering.Application.Commands;
using Ordering.Application.Exceptions;
using Ordering.Domain.Entities;
using Ordering.Domain.Repositories;

namespace Ordering.Application.Handlers;

public class UpdateOrderCommandHandler : IRequestHandler<UpdateOrderCommand>
{
    private readonly IOrderRepository _orderRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<UpdateOrderCommandHandler> _logger;

    public UpdateOrderCommandHandler(IOrderRepository orderRepository, IMapper mapper, ILogger<UpdateOrderCommandHandler> logger)
    {
        _orderRepository = orderRepository;
        _mapper = mapper;
        _logger = logger;
    }

    //Unit type means, if there is no returning object from the command, hence Task<Unit> used
    public async Task<Unit> Handle(UpdateOrderCommand request, CancellationToken cancellationToken)
    {
        var orderToUpdate = await _orderRepository.GetByIdAsync(request.Id);
        if (orderToUpdate == null)
        {
            throw new NotFoundException(nameof(Order), request.Id);
        }

        _mapper.Map(request, orderToUpdate, typeof(UpdateOrderCommand), typeof(Order));
        //_mapper.Map<Order>(request);

        await _orderRepository.UpdateAsync(orderToUpdate);

        _logger.LogInformation($"Order {orderToUpdate.Id} is successfully updated.");

        //Unit.Value gets returned, if there is no specific object is getting returned from command
        return Unit.Value;
    }
}
