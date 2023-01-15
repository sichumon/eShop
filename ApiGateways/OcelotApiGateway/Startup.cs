using Ocelot.Cache.CacheManager;
using Ocelot.DependencyInjection;
using Ocelot.Middleware;

namespace OcelotApiGateway;

public class Startup
{
    // This method gets called by the runtime. Use this method to add services to the container.
    // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
    public void ConfigureServices(IServiceCollection services)
    {
        services
            .AddCors(options =>
            {
                options.AddPolicy("CorsPolicy", policy =>
                {
                    //TODO read the same from settings for prod deployment
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("http://localhost:4200");
                });
            })
            .AddOcelot()
            .AddCacheManager(c => c.WithDictionaryHandle());

        //Tracing setting
        // services.AddOpenTelemetryTracing((builder) =>
        // {
        //     builder
        //         .AddAspNetCoreInstrumentation()
        //         .SetResourceBuilder(ResourceBuilder.CreateDefault().AddService("OcelotApiGw"))
        //         .AddHttpClientInstrumentation()
        //         .AddSource(nameof(IOcelotBuilder))
        //         .AddJaegerExporter(options =>
        //         {
        //             options.AgentHost = "localhost";
        //             options.AgentPort = 6831;
        //             options.ExportProcessorType = ExportProcessorType.Simple;
        //         })
        //         .AddConsoleExporter(options =>
        //         {
        //             options.Targets = ConsoleExporterOutputTargets.Console;
        //         });
        // });
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public async void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseRouting();
        app.UseCors("CorsPolicy");

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapGet("/", async context =>
            {
                await context.Response.WriteAsync("Hello World!");
            });
        });

        await app.UseOcelot();
    }
}