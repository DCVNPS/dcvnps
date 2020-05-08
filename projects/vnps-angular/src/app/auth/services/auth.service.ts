import { Injectable } from '@angular/core';
import { tap, catchError, mapTo } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { ApiService } from '../../api/services/api.service';
import { Tokens } from '../models/tokens';
import { TokenTypeEnum } from '../models/token-type.enum';
import { LoggedInUser } from '../models/loginuser';
import { IChangePassword } from '../models/change-password';
import { environment } from '../../../environments/environment';
import { AdminLevel } from '../../shared/models/interfaces';
import { AdminlevelDataService } from '../../api/services/adminlevel-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authStorageKey = 'dcvnps-manage-jwt';
  private userStorageKey = 'dcvnps-manage-user';
  redirectUrl: string;

  constructor(private api: ApiService, private admLvlSrvc: AdminlevelDataService) {
  }

  storeJwtTokens(tokens: Tokens) {
    localStorage.setItem(this.authStorageKey, JSON.stringify(tokens));
  }

  storeUser(user: LoggedInUser) {
    localStorage.setItem(this.userStorageKey, JSON.stringify(user));
  }

  getTokens() {
    const tokenValue = localStorage.getItem(this.authStorageKey);
    return tokenValue ? JSON.parse(tokenValue) : null;
  }

  get User() {
    const userValue = localStorage.getItem(this.userStorageKey);
    return userValue ? JSON.parse(userValue) : null;
  }

  get isLoggedIn(): boolean {
    return this.User != null;
  }

  removeTokens() {
    localStorage.removeItem(this.authStorageKey);
    localStorage.removeItem(this.userStorageKey);
  }

  lastRead() {
    const tokenValue = localStorage.getItem(this.authStorageKey);
    const tokens = tokenValue ? JSON.parse(tokenValue) : null;
    return tokens ? tokens.lastRead : null;
  }

  get LoggedInRole() {
    if (!this.isLoggedIn ) {
      return null;
    }
    const loggedInUser = this.User;
    return loggedInUser ? loggedInUser.role : null;
  }

  levelAdmin(level: string): boolean {
    if (!this.isLoggedIn) {
      return false;
    }
    const thisLevel = this.admLvlSrvc.AdminLevels.find(rl => rl.level === level);
    return thisLevel ? (this.LoggedInRole === thisLevel.role) : false;
  }

  get adminLevel(): AdminLevel | undefined {
    const thisLevel = this.admLvlSrvc.AdminLevels.find(rl => rl.role === this.LoggedInRole);
    return thisLevel;
  }

  get isAdmin(): boolean {
    if (!this.isLoggedIn) {
      return false;
    }
    const pattern = new RegExp('adm$', 'i');
    const result = pattern.test(this.LoggedInRole);
    return result;
  }

  get siteAdmin(): boolean {
    if (!this.isLoggedIn) {
      return false;
    }
    return  this.LoggedInRole === 'SITEADM';
  }

  login(user: { email: string, password: string }): Observable<boolean> {
    return this.api.post('auth/login', user)
      .pipe(
        tap(data => {
          if (data.jwtToken) {
            this.doLoginUser(user, data);
            return of(true);
          } else {
            return of(false);
          }
        })
      );
  }

  doLoginUser(user: { email: string; password: string; }, data: any): void {
    this.storeUser({ email: user.email, role: data.role });
    this.storeJwtTokens({ jwtToken: data.jwtToken, refreshToken: data.refreshToken, lastRead: data.lastRead });
  }

  logout(): Observable<boolean> {
    return this.api.post('auth/logout', { refreshToken: this.getToken(TokenTypeEnum.REFRESH_TOKEN) })
      .pipe(
        tap(() => { this.doLogoutUser(); }),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        })
      );
  }

  renewToken(): Observable<string> {
    const refreshToken = this.getToken(TokenTypeEnum.REFRESH_TOKEN);
    // console.log(`RenewToken -- refreshToken: ${refreshToken}`);
    return this.api.post('auth/renewtoken', { refreshToken })
      .pipe(
        tap(data => {
          this.storeUser({ email: this.User.email, role: data.role });
          this.storeJwtTokens({ jwtToken: data.jwtToken, refreshToken: data.refreshToken, lastRead: data.lastRead });
          console.log({ jwtToken: data.jwtToken, refreshToken: data.refreshToken, lastRead: data.lastRead });
          const jwtToken: string = data.jwtToken;
          return of(jwtToken);
        }),
      );
  }

  getToken(tokenType: TokenTypeEnum): string {
    const tokens = this.getTokens();
    let token: string;
    switch (tokenType) {
      case TokenTypeEnum.JWT_TOKEN:
        token = tokens ? tokens.jwtToken : environment.defaultAuthToken;
        break;
      case TokenTypeEnum.REFRESH_TOKEN:
        token = tokens ? tokens.refreshToken : 'Not authorized';
        break;
      default:
        token = environment.defaultAuthToken;
    }
    return token;
  }

  doLogoutUser(): void {
    this.removeTokens();
  }

  changePassword(credentail: IChangePassword): Observable<boolean> {
    return this.api.post('auht/changepassword', credentail).pipe(
      mapTo(true)
    );
  }

}
