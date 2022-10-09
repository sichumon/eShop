using Microsoft.Extensions.Logging;
using Ordering.Domain.Entities;

namespace Ordering.Infrastructure.Data;

public class OrderContextSeed
{
    public static async Task SeedAsync(OrderContext orderContext, ILoggerFactory loggerFactory)
    {
        if (!orderContext.Orders.Any())
        {
            var logger = loggerFactory.CreateLogger<OrderContextSeed>();
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
                EmailAddress = "rahulsahay19@hotmail.com",
                AddressLine = "Bangalore",
                Country = "India",
                State = "KA",
                ZipCode = "560001",
                TotalPrice = 750,
                CardName = "Visa",
                CardNumber = "1234567890123456",
                CreatedBy = "Rahul",
                Expiration = "12/25",
                Cvv = "123",
                PaymentMethod=1,
                LastModifiedBy = "Rahul",
                LastModifiedDate = new DateTime(),
                
            }
        };
    }
}