import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from '../api/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class ClassesResolverService {
  private apiEndpoint: string;
  constructor(private api: ApiService) {
  }
  resolve(route: ActivatedRouteSnapshot): Observable<any>|Promise<any>|any {
      const classlevel = route.paramMap.get('level') || 'level1';
      this.apiEndpoint = (classlevel) ? `vnpsclasses/bylevel/${classlevel}` : `vnpsclasses/bylevel`;
      // console.log(this.apiEndpoint);
      return this.api.get(this.apiEndpoint);
  }
}
