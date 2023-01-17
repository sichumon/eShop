import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account/account.service';
import { BasketService } from '../basket/basket.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  constructor(private basketService: BasketService, private accountService: AccountService){}
  ngOnInit() {
    //TODO: This will come from identity service
   // this.accountService.login();
    this.basketService.sendCheckout('rahul');
  }

}
