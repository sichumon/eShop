using Microsoft.Extensions.Logging;
using Ordering.Domain.Entities;

namespace Ordering.Infrastructure.Data;

public class OrderContextSeed
{
    public static async Task SeedAsync(OrderContext orderContext, ILogger<OrderContextSeed>? logger)
    {
        if (!orderContext.Orders.Any())
        {
           // var logger = loggerFactory.CreateLogger<OrderContextSeed>();
            orderContext.Orders.AddRange(GetPreconfiguredOrders());
            await orderContext.SaveChangesAsync();
            logger.LogInformation($"Seed database associated with context {typeof(OrderContext).Name}");
        }
    }

    private static IEnumerable<Order> GetPreconfiguredOrders()
    {
        return new List<Order>
        {
            new Order()
            {
                UserName = "rahul", 
                FirstName = "Rahul",
                LastName = "Sahay",
                EmailAddress = "rahulsahay@eshop.net",
                AddressLine = "Bangalore",
                Country = "India",
                TotalPrice = 750,
                // State = "KA",
                // ZipCode = "560001",
                //
                // CardName = "Visa",
                // CardNumber = "1234567890123456",
                // CreatedBy = "Rahul",
                // Expiration = "12/25",
                // Cvv = "123",
                // PaymentMethod=1,
                // LastModifiedBy = "Rahul",
                // LastModifiedDate = new DateTime(),
                
            }
        };
    }
}