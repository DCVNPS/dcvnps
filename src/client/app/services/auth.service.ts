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
    localStorage.setItem(this.storageKey, JSON.stringify(authToken));
    // localStorage.setItem(this.roleKey, authToken.role);
  }

  getToken() {
      const auth =  JSON.parse(localStorage.getItem(this.storageKey));
      return auth ? auth.token : null;
  }

  isLogin() {
    return this.getToken() !== null;
  }

  removeToken() {
    localStorage.removeItem(this.storageKey);
  }

  lastRead(){
    const auth =  JSON.parse(localStorage.getItem(this.storageKey));
    return auth ? auth.lastRead : null;
  }
  getRole() {
    if (this.isLogin()) {
      const auth =  JSON.parse(localStorage.getItem(this.storageKey));
      return auth.role;
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

  logout() {
    this.removeToken();
    this.router.navigateByUrl('/home');
  }
}

export class AuthToken {
  public token: string;
  public role: string;
  public lastRead: number;
}
