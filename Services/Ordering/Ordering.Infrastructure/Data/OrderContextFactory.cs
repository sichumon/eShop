// using Microsoft.EntityFrameworkCore;
// using Microsoft.EntityFrameworkCore.Design;
// using Microsoft.Extensions.Configuration;
// using Ordering.Domain.Entities;
//
// namespace Ordering.Infrastructure.Data;
//
// public class OrderContextFactory : IDesignTimeDbContextFactory<OrderContext>
// {
//     public OrderContext CreateDbContext(string[] args)
//     {
//         IConfigurationRoot configuration = new ConfigurationBuilder()
//             .SetBasePath(Directory.GetCurrentDirectory())
//             //.AddJsonFile("appsettings.json")
//             .Build();
//         var builder = new DbContextOptionsBuilder<OrderContext>();
//         var connectionString = configuration.GetConnectionString("OrderingConnectionString");
//         builder.UseSqlServer(connectionString);
//         return new OrderContext(builder.Options);
//     }
// }