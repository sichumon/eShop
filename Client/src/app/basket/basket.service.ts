import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IBasket } from '../shared/models/basket';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  baseUrl = 'http://localhost:9010/';
  //This will emit an initial value and emit current value whenever its subscribed to
  private basketSource = new BehaviorSubject<IBasket>(null);
  //for public access like using async pipe to get the value
  basket$ = this.basketSource.asObservable();
  constructor(private http: HttpClient) { }

  getBasket(userName: string){
    return this.http.get(this.baseUrl+'');
  }
}
