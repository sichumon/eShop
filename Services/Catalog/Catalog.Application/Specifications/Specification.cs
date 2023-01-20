using System.Linq.Expressions;

namespace Catalog.Application.Specifications;

public class Specification<T> : ISpecification<T>
{
    public Expression<Func<T, bool>> Searchriteria { get; }
    public List<Expression<Func<T, object>>> Includes { get; }
}