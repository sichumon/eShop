export interface IBasketItem {
  quantity: number;
  imageFile: string;
  price: number;
  productId: string;
  productName: string;
}

export interface IBasket {
  userName: string;
  items: IBasketItem[];
  totalPrice: number;
}

export class Basket implements IBasket {
    userName: string;
    totalPrice: number;
    items: IBasketItem[] = [];
 }

 export interface IBasketTotals {
    total: number;
 }
