using Catalog.Application.Mappers;
using Catalog.Application.Queries;
using Catalog.Application.Responses;
using Catalog.Core.Repositories;
using MediatR;

namespace Catalog.Application.Handlers;

public class GetProductByCategoryHandler : IRequestHandler<GetProductByCategoryQuery, IList<ProductResponse>>
{
    private readonly IProductRepository _productRepository;

    public GetProductByCategoryHandler(IProductRepository productRepository)
    {
        _productRepository = productRepository;
    }
    public async Task<IList<ProductResponse>> Handle(GetProductByCategoryQuery request, CancellationToken cancellationToken)
    {
        var productList = await _productRepository.GetProductByCategory(request.CategoryName);
        var productResponseList = ProductMapper.Mapper.Map<IList<ProductResponse>>(productList);
        return productResponseList;
    }
}