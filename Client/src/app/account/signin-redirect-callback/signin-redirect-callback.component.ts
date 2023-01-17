import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-signin-redirect-callback',
  template: `<div></div>`
})
export class SigninRedirectCallbackComponent implements OnInit {

  constructor(private _authService: AccountService, private _router: Router) { }

  ngOnInit(): void {
    this._authService.finishLogin()
    .then(_ => {
      console.log('inside finish login');
      this._router.navigate(['/'], { replaceUrl: true });
    })
  }
}
