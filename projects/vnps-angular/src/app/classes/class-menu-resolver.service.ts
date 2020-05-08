import { Injectable } from '@angular/core';
import { ApiService } from '../api/services/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClassMenuResolverService {
  constructor(private api: ApiService) {
  }
  resolve(): Observable<any>|Promise<any>|any {
      const apiEndpoint = 'commons/vnpsclassmenu';
      return this.api.get(apiEndpoint);
  }
}
