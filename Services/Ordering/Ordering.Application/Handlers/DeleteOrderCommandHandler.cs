using AutoMapper;
using MediatR;
using Microsoft.Extensions.Logging;
using Ordering.Application.Commands;
using Ordering.Application.Exceptions;
using Ordering.Domain.Entities;
using Ordering.Domain.Repositories;

namespace Ordering.Application.Handlers;

public class DeleteOrderCommandHandler : IRequestHandler<DeleteOrderCommand>
{
    private readonly IOrderRepository _orderRepository;
    private readonly IMapper _mapper;
    private readonly ILogger<DeleteOrderCommandHandler> _logger;

    public DeleteOrderCommandHandler(IOrderRepository orderRepository, IMapper mapper, ILogger<DeleteOrderCommandHandler> logger)
    {
        _orderRepository = orderRepository;
        _mapper = mapper;
        _logger = logger;
    }
    //Unit type means, if there is no returning object from the command, hence Task<Unit> used
    public async Task<Unit> Handle(DeleteOrderCommand request, CancellationToken cancellationToken)
    {
        var orderToDelete = await _orderRepository.GetByIdAsync(request.Id);
        if (orderToDelete is null)
        {
            throw new NotFoundException(nameof(Order), request.Id);
        }

        await _orderRepository.DeleteAsync(orderToDelete);
        _logger.LogInformation($"Order with id {request.Id} is deleted successfully");
        //This is meant for void return type
        //Unit.Value gets returned, if there is no specific object is getting returned from command
        return Unit.Value;
    }
}