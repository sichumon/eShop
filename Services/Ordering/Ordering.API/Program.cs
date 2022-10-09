using Ordering.API.Extensions;
using Ordering.Infrastructure.Data;

namespace Ordering.API;

public class Program
{
   public static async Task Main(string[] args)
    {
        var host = CreateHostBuilder(args).Build();
        await CreateAndSeedDb(host);
        host.Run();
    }

    public static IHostBuilder CreateHostBuilder(string[] args) =>
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
            });

    private static async Task CreateAndSeedDb(IHost host)
    {
        using (var scope = host.Services.CreateScope())
        {
            var services = scope.ServiceProvider;
            var loggerFactory = services.GetRequiredService<ILoggerFactory>();
            try
            {
                var orderContext = services.GetRequiredService<OrderContext>();
                await OrderContextSeed.SeedAsync(orderContext, loggerFactory);
            }
            catch (Exception ex)
            {
                var logger = loggerFactory.CreateLogger<Program>();
                logger.LogError($"Exception Occured in API: {ex.Message}");
            }
        }
    }
}
