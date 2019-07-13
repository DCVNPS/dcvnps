import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private roleLevels = [
    { 'role': 'MBMRADM', 'level': 'member' },
    { 'role': 'LVL3ADM', 'level': 'level3' },
    { 'role': 'LVL2ADM', 'level': 'level2' },
    { 'role': 'LVL1ADM', 'level': 'level1' }
  ];
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

  getRole() {
    if (this.isLogin()) {
      return localStorage.getItem(this.roleKey);
    }
    return null;
  }

  isAdmin(level?: string) {
    let isLevelAdmin = false;
    let roleLevel: any;
    let roleStr: string;
    if (this.isLogin()) {
      roleStr = this.getRole();
      const match = roleStr.match(/ADM$/g);
      // console.log({ 'level': level, 'role': roleStr, 'match': match });
      if (level) {
        roleLevel = this.roleLevels.find(rl => rl.role === roleStr && rl.level === level);
      }
      if (match[0] === 'ADM' && (roleLevel)) {
        isLevelAdmin = true;
      }
    }
    return isLevelAdmin || roleStr === 'SITEADMIN';
  }

  siteAdmin() {
    return this.getRole() === 'SITEADM';
  }

  // levelAdmin() {
  //   return this.isAdmin() || this.siteAdmin();
  // }

  logout() {
    this.removeToken();
    this.router.navigate(['/home']);
  }
}

export class AuthToken {
  public token: string;
  public role: string;
}
