using Microsoft.EntityFrameworkCore;
using Ordering.Domain.Common;
using Ordering.Domain.Entities;

namespace Ordering.Infrastructure.Data;

//TODO Need to Handle null case for order context. Need to apply nullable changes to columns 
//Without this, while querying data using username, it will return system.data.sqltypes.sqlnullvalueexception data is null exception 
public class OrderContext : DbContext
{
    public OrderContext(DbContextOptions<OrderContext> options): base(options)
    {
        
    }

    public DbSet<Order> Orders { get; set; }

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = new CancellationToken())
    {
        foreach (var entry in ChangeTracker.Entries<EntityBase>())
        {
            switch (entry.State)
            {
                case EntityState.Added:
                    entry.Entity.CreatedDate = DateTime.Now;
                    entry.Entity.CreatedBy = "rahul"; //This is hardcoded as Identity server is not implemented, hence no user profile maintained
                    //TODO Need to check optional use case
                    entry.Entity.LastModifiedBy = "rahul";
                    entry.Entity.LastModifiedDate = DateTime.Now;
                    break;
                case EntityState.Modified:
                    entry.Entity.CreatedDate = DateTime.Now;
                    entry.Entity.CreatedBy = "rahul"; //This is hardcoded as Identity server is not implemented, hence no user profile maintained
                    //TODO Need to check optional use case
                    entry.Entity.LastModifiedDate = DateTime.Now;
                    entry.Entity.LastModifiedBy = "rahul";
                    break;
            }
        }
        return base.SaveChangesAsync(cancellationToken);
    }
}

