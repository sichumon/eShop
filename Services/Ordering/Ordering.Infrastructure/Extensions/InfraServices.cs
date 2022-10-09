using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Ordering.Domain.Repositories;
using Ordering.Infrastructure.Data;
using Ordering.Infrastructure.Repositories;

namespace Ordering.Infrastructure.Extensions;

public static class InfraServices
{
    public static IServiceCollection AddInfraServices(this IServiceCollection serviceCollection,
        IConfiguration configuration)
    {
        serviceCollection.AddDbContext<OrderContext>(options => options.UseSqlServer(
            configuration.GetConnectionString("OrderingConnectionString")),ServiceLifetime.Singleton);
        serviceCollection.AddScoped(typeof(IAsyncRepository<>), typeof(RepositoryBase<>));
        serviceCollection.AddTransient<IOrderRepository, OrderRepository>();
        return serviceCollection;
    }
    
}