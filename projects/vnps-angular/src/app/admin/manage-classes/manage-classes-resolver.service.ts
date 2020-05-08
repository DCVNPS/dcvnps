import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../../api/services/api.service';
import { VnpsClass } from '../../shared/models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class ManageClassesResolverService implements Resolve<Array<VnpsClass>> {
  private apiEndpoint: string;
  constructor(
    private api: ApiService
  ) { }
  resolve(route: ActivatedRouteSnapshot): Observable<Array<VnpsClass>> | Promise<Array<VnpsClass>> {
    const classId = route.paramMap.get('id');
    this.apiEndpoint = classId ? `vnpsclasses/${classId}` : 'vnpsclasses';
    // console.log(this.apiEndpoint);
    return this.api.get(this.apiEndpoint);
  }
}
