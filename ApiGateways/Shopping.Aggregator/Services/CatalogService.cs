using Shopping.Aggregator.Extensions;
using Shopping.Aggregator.Models;

namespace Shopping.Aggregator.Services;

public class CatalogService : ICatalogService
{
    //This httpClient will be created from IHttpClientFactory
    private readonly HttpClient _httpClient;

    public CatalogService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }
    public async Task<IEnumerable<CatalogModel>> GetCatalog()
    {
        var response = await _httpClient.GetAsync("api/v1/catalog");
        return await response.ReadContentAs<List<CatalogModel>>();

    }

    public async Task<IEnumerable<CatalogModel>> GetCatalogByCategory(string category)
    {
        var response = await _httpClient.GetAsync($"/api/v1/Catalog/GetProductsByCategoryName/{category}");
        return await response.ReadContentAs<List<CatalogModel>>();
    }

    public async Task<CatalogModel> GetCatalog(string id)
    {
        var response = await _httpClient.GetAsync($"/api/v1/Catalog/GetProductById/{id}");
        return await response.ReadContentAs<CatalogModel>();
    }
}