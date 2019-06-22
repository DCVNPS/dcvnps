import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GalleryResolveService implements Resolve<any> {
  constructor(private api: ApiService) {
   }
  resolve( route: ActivatedRouteSnapshot) {
    const gallery = route.paramMap.get('level');
    const apiEndpoint = `/galleryphotosbyname/${gallery}`;
    return this.api.get(apiEndpoint);
  }
}
