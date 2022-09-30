using Basket.Core.Entities;

namespace Basket.Core.Repositories;

public interface IBasketRepository
{
    Task<ShoppingCart?> GetBasket(string userName);
    Task<ShoppingCart?> UpdatedBasket(ShoppingCart shoppingCart);
    Task DeleteBasket(string userName);
}