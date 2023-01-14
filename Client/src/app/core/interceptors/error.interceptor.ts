import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, delay, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}
  //This will intercept the HTTP request and it will be outgoing request
  intercept(request: HttpRequest<HttpEvent<any>>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error) => {
        if (error) {

            if (error.status === 404) {
                this.router.navigateByUrl('/not-found');
            }
            if (error.status === 500) {
                this.router.navigateByUrl('/server-error');
            }
        }
        return throwError(() => new Error(error));
    })
    );
  }
}
