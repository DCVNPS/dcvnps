import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { AuthService, AuthToken } from '../services/auth.service';
import { environment } from '../../environments/environment';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing: boolean = false;
  private refreshTokenSubject: BehaviorSubject<any> =  new BehaviorSubject<any>(null);

  constructor(private auth: AuthService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{

    // Get the auth token from the service.
    let authToken =  this.auth.getAuthToken() || environment.defaultAuthToken;

    request = this.addToken(request, authToken);

    // send cloned request with header to the next handler.
    return next.handle(request).pipe(catchError(error =>{
      if(error instanceof HttpErrorResponse && error.error === 'jwt expired'){
        return this.handleJwtExpired(request, next);
      }
      else{
        return throwError(error);
      }
    })
    );
  }

  private addToken(request: HttpRequest<any>, token: string){
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}`} });
  }

  private handleJwtExpired( request: HttpRequest<any>, next: HttpHandler){
    if(!this.isRefreshing){
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.auth.renewToken().pipe(
        switchMap( (data: any) =>{
          this.isRefreshing = false;
          this.refreshTokenSubject.next(data.authToken);
          return next.handle(this.addToken(request, data.authToken));
        })
      );
    }
    else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap( authToken => {
          return next.handle(this.addToken(request, authToken));
        })
      );
    }
  }

}
