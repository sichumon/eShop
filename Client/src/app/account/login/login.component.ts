import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isUserAuthenticated: boolean = false;

  constructor(private _authService: AccountService) {}

  ngOnInit(): void {
    this._authService.loginChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
    })
  }

  public login = () => {
    debugger;
    this._authService.login();
  }

  public logout = () => {
    this._authService.logout();
  }
}



