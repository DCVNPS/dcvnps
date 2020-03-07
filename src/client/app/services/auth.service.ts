import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { tap, catchError, mapTo } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private roleLevels: Array<any> = [];
  private authStorageKey = 'dcvnps-manage-jwt';
  private userStorageKey = 'dcvnps-manage-user'


  constructor(private api: ApiService) {
  }

  setToken(authToken: AuthToken) {
    localStorage.setItem(this.authStorageKey, JSON.stringify(authToken));
  }

  setUser(user: LoggedInUser) {
    localStorage.setItem(this.userStorageKey, JSON.stringify(user));
  }

  getTokens() {
    const authTokens = JSON.parse(localStorage.getItem(this.authStorageKey)) || null;
    return authTokens;
  }

  getUser() {
    const user = JSON.parse(localStorage.getItem(this.userStorageKey)) || null;
    return user;
  }

  isLogin() {
    return this.getTokens() != null;
  }

  removeTokens() {
    localStorage.removeItem(this.authStorageKey);
    localStorage.removeItem(this.userStorageKey);
  }

  lastRead() {
    const authTokens = JSON.parse(localStorage.getItem(this.authStorageKey));
    const lastRead = authTokens.lastRead || null;
    return lastRead;
  }

  getRole() {
    if (!this.isLogin()) {
      return null;
    }
    const loggedInUser = this.getUser();
    if (loggedInUser) {
      return loggedInUser.role
    }
    return null;
  }

  isAdmin(level?: string) {
    let levelMatch = false;
    if (!this.isLogin()) {
      return false;
    }
    this.api.get('commons/adminlevel')
      .subscribe(
        data => this.roleLevels = data
      );
    if (level) {
      const thisLevel = this.roleLevels.find(rl => rl.level === level);
      levelMatch = thisLevel ? true : false;
    }
    const authRole = this.getRole();
    if (authRole) {
      const match = authRole.match(/ADM$/g);
      return (match) ? match[0] === 'ADM' && levelMatch : false;
    }
    return false;
  }

  siteAdmin() {
    if (!this.isLogin) {
      return false;
    }
    const loggedInUser = this.getUser();
    if (loggedInUser) {
      // console.log(loggedInUser);
      return loggedInUser.role === 'SITEADM';
    }
    else {
      return false;
    }
  }

  login(user: { email: string, password: string }): Observable<boolean> {
    return this.api.post('commons/authenticate', user)
      .pipe(
        tap(data => this.doLoginUser(user, data)),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        })
      )
  }

  doLoginUser(user: { email: string; password: string; }, data: any): void {
    this.setUser({ email: user.email, role: data.role });
    this.setToken({ authToken: data.authToken, refreshToken: data.refreshToken, lastRead: data.lastRead });
  }

  logout() {
    return this.api.post('commons/logout', { 'refreshToken': this.getRefreshToken() })
      .pipe(
        tap(() => { this.doLogoutUser() }),
        mapTo(true),
        catchError(error => {
          alert(error.error);
          return of(false);
        })
      );
  }

  renewToken() {
    return this.api.post('commons/renewtoken', { 'refreshToken': this.getRefreshToken() })
      .pipe(
        tap(data => {
          this.setUser({ email: this.getUser().email, role: data.role });
          this.setToken({ authToken: data.authToken, refreshToken: data.refreshToken, lastRead: data.lastRead });
          console.log({ authToken: data.authToken, refreshToken: data.refreshToken, lastRead: data.lastRead })
        })
      );
  }

  getRefreshToken() {
    const tokens = this.getTokens();
    if (tokens) {
      return tokens.refreshToken;
    }
    return null;
  }

  getAuthToken() {
    const tokens = this.getTokens();
    if (tokens) {
      return tokens.authToken;
    }
    return null;
  }

  doLogoutUser(): void {
    this.removeTokens();
  }
}

// export class AuthToken {
//   public authToken: string;
//   public role: string;
//   public lastRead: number;
//   public refreshToken:string;
// }

export class AuthToken {
  public authToken: string;
  public refreshToken: string;
  public lastRead: number;
}

export class LoggedInUser {
  public email: string;
  public role: string;
}