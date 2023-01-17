import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  basket$: Observable<IBasket>;
  public isUserAuthenticated: boolean = false;
  constructor(private basketService: BasketService, private accountService: AccountService){}
  ngOnInit() {
    this.basket$ = this.basketService.basket$;
    this.accountService.loginChanged.subscribe({
      next:(res)=>{
        this.isUserAuthenticated = res;
      },error:(err) =>{
        console.log(`An error occurred while setting isUserAuthenticated flag.`)
      }
    })
    console.log(`current user:`);

  }
  public login = () => {
    this.accountService.login();
  }
  public logout = () => {
    this.accountService.logout();
  }
}
