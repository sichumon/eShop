import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isUserAuthenticated: boolean = false;
  returnUrl: string;

  constructor(private _authService: AccountService, private basketService: BasketService) {}

  ngOnInit(): void {
    // this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/shop';
    // this._authService.loginChanged
    // .subscribe(res => {
    //   this.isUserAuthenticated = res;
    //   this.router.navigateByUrl(this.returnUrl);
    // })
    //TODO: username will be replaced by IdentityService name
    this.basketService.sendCheckout('rahul');
  }

  public login = () => {
    this._authService.login();
  }

  public logout = () => {
    this._authService.logout();
  }
}



