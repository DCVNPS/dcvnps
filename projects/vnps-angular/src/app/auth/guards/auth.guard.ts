import { Injectable } from '@angular/core';
// tslint:disable-next-line: max-line-length
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanActivateChild, CanLoad, NavigationExtras, Route } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { TokenTypeEnum } from '../models/token-type.enum';
import { MessageService } from '../../api/services/message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(
    private authService: AuthService,
    private router: Router  ) { }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn && this.authService.isAdmin) { return true; }

    if (this.authService.isLoggedIn) {
      this.router.navigate(['/home']);
      return false;
    }
    // store the attemped URL for redirecting
    this.authService.redirectUrl = url;

    // create a dummy session id
    const sessionId = this.authService.getToken(TokenTypeEnum.REFRESH_TOKEN);

    // set our navigation extras object
    // that contains our global query params and fragment
    const navigationExtras: NavigationExtras = {
      queryParams: { session_id: sessionId },
      fragment: 'anchor'
    };

    // navigate to the login page with extra
    this.router.navigate(['/login'], navigationExtras);
    return false;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    // console.log('AuthGuard#canActivate called');
    const url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    // console.log('AuthGuard#canActivateChild called');
    return this.canActivate(route, state);
  }

  canLoad(route: Route): boolean {
    const url = `${route.path}`;
    return this.checkLogin(url);
  }
}
