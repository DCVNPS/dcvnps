import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  storageKey = 'dcvnps-manager-jwt';
  roleKey = 'dcvnps-role';

  constructor(private router: Router) { }

  setToken(authToken: AuthToken) {
    localStorage.setItem(this.storageKey, authToken.token);
    localStorage.setItem(this.roleKey, authToken.role);
  }

  getToken() {
    return localStorage.getItem(this.storageKey);
  }

  isLogin() {
    return this.getToken() !== null;
  }

  removeToken() {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.roleKey);
  }

  // setRole(role: string) {
  //   localStorage.setItem(this.roleKey, role);
  // }

  getRole() {
    return localStorage.getItem(this.roleKey);
  }

  // removeRole() {
  //   localStorage.removeItem(this.roleKey);
  // }

  isAdmin() {
    const roleStr = this.getRole();
     const match = roleStr.match(/ADM$/g);
     return (match ? true : false);
  }
  logout() {
    this.removeToken();
    this.router.navigate(['/home']);
  }
}

export class AuthToken{
  public token: string;
  public role: string;
}