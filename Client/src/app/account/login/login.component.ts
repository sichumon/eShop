import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isUserAuthenticated: boolean = false;
  returnUrl: string;

  constructor(private _authService: AccountService, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.returnUrl = this.activatedRoute.snapshot.queryParams.returnUrl || '/shop';
    this._authService.loginChanged
    .subscribe(res => {
      this.isUserAuthenticated = res;
      this.router.navigateByUrl(this.returnUrl);
    })
  }

  public login = () => {
    this._authService.login();
  }

  public logout = () => {
    this._authService.logout();
  }
}



