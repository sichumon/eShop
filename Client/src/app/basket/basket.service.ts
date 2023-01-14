import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Basket, IBasket, IBasketItem } from '../shared/models/basket';
import { IProduct } from '../shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = 'http://localhost:9010';
  //This will emit an initial value and emit current value whenever its subscribed to
  private basketSource = new BehaviorSubject<IBasket>(null);
  //for public access like using async pipe to get the value
  basket$ = this.basketSource.asObservable();
  constructor(private http: HttpClient) { }

  //TODO: This username it will pick from the identity service
  getBasket(userName: string){
    return this.http.get(this.baseUrl+'/Basket/GetBasket/rahul')
      .pipe(
        map((basket: IBasket)=>{
          this.basketSource.next(basket);
          console.log('current basket value:- ')
          console.log(this.getCurrentBasketValue());
        })
      )
  }
  setBasket(basket: IBasket){
    console.log(`Setting basket:-`);
    console.log(basket);

    return this.http.post(this.baseUrl+'/Basket/CreateBasket',basket).subscribe({
      next:(res:IBasket)=>{
        this.basketSource.next(res);
        basket.items = res.items;
        basket.userName = res.userName;
        basket.totalPrice = res.totalPrice;
        console.log(`Basket after response:`);
        console.log(basket);
      },error:(err)=>{
        console.log(`An error occured while setting Basket for the user:- ${basket.userName}.`);
        console.log(err);
      }
    })
  }
  getCurrentBasketValue(){
    return this.basketSource.value;
  }

  createBasket(): IBasket {
    const basket = Object.assign(new Basket(),{
      userName: 'rahul',
      totalPrice: 0
    });
    //This is specific to browser. This can be replaced with some redis service api
    //TODO: This username it will pick from the identity service
    //localStorage.setItem('basket_username', basket.userName);
    localStorage.setItem('basket_username', 'rahul');
    return basket;
  }

  addItemToBasket(item:IProduct, quantity = 1){
    const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, quantity);
    const basket = this.getCurrentBasketValue() ?? this.createBasket();
    basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
    this.setBasket(basket);
  }
  private addOrUpdateItem(items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
    console.log(items);
    const index = items.findIndex(i=>i.productId === itemToAdd.productId);
    if(index === -1){
      itemToAdd.quantity=quantity;
      items.push(itemToAdd);
    }else{
      //if basket is not empty
      items[index].quantity +=quantity;
    }
    return items;
  }


  private mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {
    return {
      productId: item.id,
      productName: item.name,
      price: item.price,
      color: 'Red', //TODO: Remove this redundant prop
      quantity

    }
  }
}


