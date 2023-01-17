import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserManager, UserManagerSettings } from 'oidc-client';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'http://localhost:9009/';
  private currentUserSource = new BehaviorSubject<IUser>(null);
  currentUser$ = this.currentUserSource.asObservable;

  // Observable navItem source
  private _authNavStatusSource = new BehaviorSubject<boolean>(false);
  // Observable navItem stream
  authNavStatus$ = this._authNavStatusSource.asObservable();

  private manager = new UserManager(getClientSettings());

  constructor(private http: HttpClient) { }

  login(values: any){
    return this.http.post()
  }
}
function getClientSettings(): UserManagerSettings {
  return {
    authority: 'http://localhost:9009',
    client_id: 'angular_spa',
    redirect_uri: 'http://localhost:4200/auth-callback',
    post_logout_redirect_uri: 'http://localhost:4200/',
    response_type:"id_token token",
    scope:"openid profile email api.read",
    filterProtocolClaims: true,
    loadUserInfo: true,
    automaticSilentRenew: true,
    silent_redirect_uri: 'http://localhost:4200/silent-refresh.html'
};
}

