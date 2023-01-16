namespace IdentityServer
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();

            //SeedDatabase(host);
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });

        // private static void SeedDatabase(IHost host)
        // {
        //     using var serviceScope = host.Services.CreateScope();
        //
        //     serviceScope.ServiceProvider.GetRequiredService<PersistedGrantDbContext>().Database.Migrate();
        //
        //     var context = serviceScope.ServiceProvider.GetRequiredService<ConfigurationDbContext>();
        //
        //     QuickStartContextSeed.SeedAsync(context);
        // }
    }
}