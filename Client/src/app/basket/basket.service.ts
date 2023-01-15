import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import {
  Basket,
  IBasket,
  IBasketItem,
  IBasketTotals,
} from '../shared/models/basket';
import { Checkout, ICheckout } from '../shared/models/checkout';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root',
})
export class BasketService {
  baseUrl = 'http://localhost:9010';
  //This will emit an initial value and emit current value whenever its subscribed to
  private basketSource = new BehaviorSubject<IBasket>(null);
  //for public access like using async pipe to get the value
  basket$ = this.basketSource.asObservable();
  private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
  basketTotalSource$ = this.basketTotalSource.asObservable();
  constructor(private http: HttpClient) {}

  //TODO: This username it will pick from the identity service
  getBasket(userName: string) {
    return this.http.get(this.baseUrl + '/Basket/GetBasket/rahul').pipe(
      map((basket: IBasket) => {
        this.basketSource.next(basket);
        this.calculateTotals();
        console.log('current basket value:- ');
        console.log(this.getCurrentBasketValue());
      })
    );
  }
  setBasket(basket: IBasket) {
    console.log(`Setting basket:-`);
    console.log(basket);

    return this.http
      .post(this.baseUrl + '/Basket/CreateBasket', basket)
      .subscribe({
        next: (res: IBasket) => {
          this.basketSource.next(res);
          basket.items = res.items;
          basket.userName = res.userName;
          basket.totalPrice = res.totalPrice;
          this.calculateTotals();
          console.log(`Basket after response:`);
          console.log(basket);
        },
        error: (err) => {
          console.log(
            `An error occured while setting Basket for the user:- ${basket.userName}.`
          );
          console.log(err);
        },
      });
  }
  getCurrentBasketValue() {
    return this.basketSource.value;
  }

  createBasket(): IBasket {
    const basket = Object.assign(new Basket(), {
      userName: 'rahul',
      totalPrice: 0,
    });
    //This is specific to browser. This can be replaced with some redis service api
    //TODO: This username it will pick from the identity service
    //localStorage.setItem('basket_username', basket.userName);
    localStorage.setItem('basket_username', 'rahul');
    return basket;
  }

  private createCheckout(userName): ICheckout {
    const checkout = Object.assign(new Checkout(), {
      userName: userName,
      totalPrice: 0,
      firstName: 'Rahul',
      lastName: 'Sahay',
      emailAddress: 'rahulsahay@eshop.net',
      addressLine: 'Bangalore',
      country: 'India',
      state: 'KA',
      zipCode: '560001',
      cardName: 'Visa',
      cardNumber: '1234567890123456',
      expiration: '12/25',
      cvv: '123',
      paymentMethod: 1,
    });
    return checkout;
  }

  sendCheckout(userName){
    console.log('Starting checkout');
    const checkout = this.createCheckout(userName);
    console.log(checkout);
    return this.http.post(this.baseUrl + '/Basket/Checkout', checkout)
    .subscribe({
      next:(resp)=>{
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        console.log(resp);
      }, error:(err)=>{
        console.log('An error occurred while doing checkout');
        console.log(err);
      }
    });
  }

  addItemToBasket(item: IProduct, quantity = 1) {
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(
      item,
      quantity
    );
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }

  incrementItemQuantity(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(
      (x) => x.productId === item.productId
    );
    basket.items[foundItemIndex].quantity++;
    this.setBasket(basket);
  }

  decrementItemQuantity(item: IBasketItem) {
    debugger;
    const basket = this.getCurrentBasketValue();
    const foundItemIndex = basket.items.findIndex(
      (x) => x.productId === item.productId
    );
    if (basket.items[foundItemIndex].quantity > 1) {
      basket.items[foundItemIndex].quantity--;
      this.setBasket(basket);
    } else {
      this.removeItemFromBasket(item);
    }
  }

  removeItemFromBasket(item: IBasketItem) {
    const basket = this.getCurrentBasketValue();
    //this will return a boolean which matches this id
    if (basket.items.some((x) => x.productId === item.productId)) {
      //then filterout the matching item and return the remaining
      basket.items = basket.items.filter((x) => x.productId !== item.productId);
      if (basket.items.length > 0) {
        this.setBasket(basket);
      } else {
        this.deleteBasket(basket.userName);
      }
    }
  }

  deleteBasket(userName) {
    return this.http
      .delete(this.baseUrl + '/Basket/DeleteBasket/' + userName)
      .subscribe({
        next: (res) => {
          this.basketSource.next(null);
          this.basketTotalSource.next(null);
          localStorage.removeItem('basket_username');
        },
        error: (err) => {
          console.log('Error occurred while deleting the basket');
          console.log(err);
        },
      });
  }

  private calculateTotals() {
    const currentBasket = this.getCurrentBasketValue();
    //b==item, a== number returned from reduce function
    //a initially set to 0
    const total = currentBasket.items.reduce(
      (a, b) => b.price * b.quantity + a,
      0
    );
    this.basketTotalSource.next({ total });
  }
  private addOrUpdateItem(
    items: IBasketItem[],
    itemToAdd: IBasketItem,
    quantity: number
  ): IBasketItem[] {
    console.log(items);
    const index = items.findIndex((i) => i.productId === itemToAdd.productId);
    if (index === -1) {
      itemToAdd.quantity = quantity;
      items.push(itemToAdd);
    } else {
      //if basket is not empty
      items[index].quantity += quantity;
    }
    return items;
  }

  private mapProductItemToBasketItem(
    item: IProduct,
    quantity: number
  ): IBasketItem {
    return {
      productId: item.id,
      productName: item.name,
      price: item.price,
      imageFile: item.imageFile,
      quantity,
    };
  }
}
