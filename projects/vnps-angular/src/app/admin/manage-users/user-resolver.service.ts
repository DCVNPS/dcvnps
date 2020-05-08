import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { User } from '../../shared/models/interfaces';
import { ApiService } from '../../api/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ManageUserResolverService implements Resolve<Array<User>> {
  private apiEndpoint: string;
  constructor(
    private api: ApiService
  ) { }
  resolve(route: ActivatedRouteSnapshot): Observable<Array<User>> | Promise<Array<User>> {
    const userId = route.paramMap.get('id');
    this.apiEndpoint = userId ? `users/${userId}` : 'users';
    // console.log(this.apiEndpoint);
    return this.api.get(this.apiEndpoint);
  }
}
