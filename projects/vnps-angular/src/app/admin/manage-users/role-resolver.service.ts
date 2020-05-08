import { Injectable } from '@angular/core';
import { Role } from '../../shared/models/interfaces';
import { Observable, of } from 'rxjs';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from '../../api/services/api.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RoleResolverService implements Resolve<Array<Role>> {
  private roles: Array<Role> = [];
  constructor(
    private api: ApiService
  ) { }
  resolve(route: ActivatedRouteSnapshot): Observable<Array<Role>> | Promise<Array<Role>> {
    return this.api.get('commons/roles');
  }
}
