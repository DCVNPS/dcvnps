import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';

import { AuthService } from '../services/auth.service';
import { environment } from '../../../environments/environment';
import { Observable, throwError, BehaviorSubject, of } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { TokenTypeEnum } from '../models/token-type.enum';
import { HandleError, HttpErrorHandlerService } from '../../api/services/http-error-handler.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private handleError: HandleError;
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private auth: AuthService,
    private httpErrorHandler: HttpErrorHandlerService
  ) {
    this.handleError = this.httpErrorHandler.createHandleError('AuthInterceptor');
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Get the auth token from the service.
    const authToken = this.auth.getToken(TokenTypeEnum.JWT_TOKEN) || environment.defaultAuthToken;

    request = this.addToken(request, authToken);

    // send cloned request with header to the next handler.
    return next.handle(request).pipe(
      catchError( error => {
        if (error instanceof HttpErrorResponse && error.error === 'jwt expired') {
          return this.handleJwtExpired(request, next);
        } else {
          return throwError(error);
        }
      })
    );
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

  private handleJwtExpired(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      return this.auth.renewToken().pipe(
        switchMap((jwtToken: string) => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(jwtToken);
          return next.handle(this.addToken(request, jwtToken));
        })
      );
    } else {
      return this.refreshTokenSubject.pipe(
        filter(token => token != null),
        take(1),
        switchMap(jwtToken => {
          return next.handle(this.addToken(request, jwtToken));
        })
      );
    }
  }

}
