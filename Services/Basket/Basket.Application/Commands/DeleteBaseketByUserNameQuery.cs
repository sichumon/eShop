using MediatR;

namespace Basket.Application.Commands;

public class DeleteBaseketByUserNameQuery : IRequest
{
    public string UserName { get; set; }
    public DeleteBaseketByUserNameQuery(string userName)
    {
        UserName = userName;
    }
}