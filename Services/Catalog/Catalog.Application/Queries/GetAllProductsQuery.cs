using Catalog.Application.Responses;
using Catalog.Core.Specs;
using MediatR;

namespace Catalog.Application.Queries;

public class GetAllProductsQuery : IRequest<IList<ProductResponse>>
{
    
    public CatalogSpecParams CatalogSpecParams { get; set; }

    public GetAllProductsQuery(CatalogSpecParams catalogSpecParams)
    {
        CatalogSpecParams = catalogSpecParams;
    }
}