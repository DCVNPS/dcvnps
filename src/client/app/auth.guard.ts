import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { ApiService } from './services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private appRole = { usersrole: null, admin: false };
  constructor(private auth: AuthService, private router: Router, private api: ApiService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isLogin()) {
      if (this.auth.isAdmin) {
        console.log(`User Role ${this.auth.getRole()}`);
      }
      return true;
    } else {
      this.router.navigate(['/login', { backUrl: state.url }]);
      return false;
    }
  }
}
