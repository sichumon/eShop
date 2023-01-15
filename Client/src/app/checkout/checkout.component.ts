import { Component, OnInit } from '@angular/core';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  constructor(private basketService: BasketService){}
  ngOnInit() {
    //TODO: This will come from identity service
    this.basketService.sendCheckout('rahul');
  }

}
