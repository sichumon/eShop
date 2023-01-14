import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BasketService } from './basket/basket.service';
import { IProduct } from './shared/models/product';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'eShop';
  constructor(private basketService: BasketService){}
  ngOnInit(): void {
    const basket_username = localStorage.getItem('basket_username');
    if(basket_username){
      this.basketService.getBasket(basket_username).subscribe({
        next:()=>console.log('Initialized basket'), //This will set the current basket value
        error:()=>console.log(`Error Occured while fetching basket for the username:${basket_username}`)
      });
    }
  }
}
