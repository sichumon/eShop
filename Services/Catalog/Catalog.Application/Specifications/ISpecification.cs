using System.Linq.Expressions;

namespace Catalog.Application.Specifications;

public interface ISpecification<T>
{
    //Meant for search criteria
    Expression<Func<T, bool>> Searchriteria { get; }
    //Meant for eagerly loading the expressions 
    List<Expression<Func<T, object>>> Includes { get; }
}