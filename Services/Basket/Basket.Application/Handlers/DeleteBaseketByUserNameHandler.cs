using Basket.Application.Commands;
using Basket.Core.Repositories;
using MediatR;

namespace Basket.Application.Handlers;
 
public class DeleteBaseketByUserNameHandler : IRequestHandler<DeleteBaseketByUserNameQuery>
{
    private readonly IBasketRepository _basketRepository;

    public DeleteBaseketByUserNameHandler(IBasketRepository basketRepository)
    {
        _basketRepository = basketRepository;
    }
    public async Task<Unit> Handle(DeleteBaseketByUserNameQuery request, CancellationToken cancellationToken)
    {
         await _basketRepository.DeleteBasket(request.UserName);
         return Unit.Value;
    }
}