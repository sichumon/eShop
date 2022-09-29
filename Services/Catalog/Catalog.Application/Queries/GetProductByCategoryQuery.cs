using Catalog.Application.Responses;
using MediatR;

namespace Catalog.Application.Queries;

public class GetProductByCategoryQuery : IRequest<IList<ProductResponse>>
{
    public string CategoryName { get; set; }

    public GetProductByCategoryQuery(string categoryName)
    {
        CategoryName = categoryName;
    }
}