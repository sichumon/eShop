using Catalog.Core.Entities;
using Catalog.Core.Repositories;
using Catalog.Infrastructure.Data;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Catalog.Infrastructure.Repositories;

public class ProductRepository : IProductRepository, IBrandRepository, ITypesRepository
{
    private readonly ICatalogContext _context;

    public ProductRepository(ICatalogContext context)
    {
        _context = context ?? throw new ArgumentNullException();
    }

    public async Task<IEnumerable<Product>> GetProducts(string sort)
    {
        if (!string.IsNullOrEmpty(sort))
        {
            switch (sort)
            {
                case "priceAsc":
                    return await _context
                        .Products
                        .Find(p => true)
                        .Sort(Builders<Product>.Sort.Ascending("Price"))
                        .ToListAsync();
                case "priceDesc":
                    return await _context
                        .Products
                        .Find(p => true)
                        .Sort(Builders<Product>.Sort.Descending("Price"))
                        .ToListAsync();
                default:
                    return await _context
                        .Products
                        .Find(p => true)
                        .Sort(Builders<Product>.Sort.Ascending("Name"))
                        .ToListAsync();
            }
        }
        return await _context
            .Products
            .Find(p => true)
            .Sort(Builders<Product>.Sort.Ascending("Name"))
            .ToListAsync();
    }
    
    public async Task<IEnumerable<ProductBrand>> GetAllBrands()
    {
        return await _context
            .Brands
            .Find(p => true)
            .ToListAsync();
    }
    
    public async Task<IEnumerable<ProductType>> GetAllTypes()
    {
        return await _context
            .Types
            .Find(p => true)
            .ToListAsync();
    }

    public async Task<Product> GetProduct(string id)
    {
        return await _context
            .Products
            .Find(p => p.Id == id)
            .FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<Product>> GetProductByName(string name)
    {
        FilterDefinition<Product> filter = Builders<Product>.Filter.Eq(p => p.Name, name);
        return await _context
            .Products
            .Find(filter)
            .ToListAsync();
    }

    public async Task<IEnumerable<Product>> GetProductByBrand(string brandName)
    {
        FilterDefinition<Product> filter = Builders<Product>.Filter.Eq(p => p.Brands.Name, brandName);
        return await _context
            .Products
            .Find(filter)
            .ToListAsync();
    }

    public async Task<Product> CreateProduct(Product product)
    {
        await _context.Products.InsertOneAsync(product);
        return product;
    }

    public async Task<bool> UpdateProduct(Product product)
    {
        var updateResult = await _context
            .Products
            .ReplaceOneAsync(filter: p => p.Id == product.Id, replacement: product);
        return updateResult.IsAcknowledged && updateResult.ModifiedCount > 0;
    }

    public async Task<bool> DeleteProduct(string id)
    {
        FilterDefinition<Product> filter = Builders<Product>.Filter.Eq(p => p.Id, id);

        DeleteResult deleteResult = await _context
            .Products
            .DeleteOneAsync(filter);

        return deleteResult.IsAcknowledged
               && deleteResult.DeletedCount > 0;
    }
}