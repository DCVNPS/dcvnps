import { Injectable } from '@angular/core';
import { User } from '../../shared/models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ManageUserService {

  // service use to pass user between component
  // to avoid going back to database.
  private user$: User;
  constructor() { }

  get getUser(): User {
    return this.user$;
  }

  set setUser(user: User) {
    if ( user ) {
      this.user$ = user;
    }
  }
  userFullName(user: User): string {
    return `${user.userGivenName} ${user.userSurname}`;
  }
}
