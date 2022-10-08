using MediatR;
using Ordering.Application.Commands;

namespace Ordering.Application.Queries;

public class GetOrdersListQuery:IRequest<List<OrderResponse>>
{
    public string UserName { get; set; }

    public GetOrdersListQuery(string userName)
    {
        UserName = userName;
    }
}