import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GalleryPhotosResolve implements Resolve<any> {
  constructor(private api: ApiService) {
   }
  resolve( route: ActivatedRouteSnapshot) {
    const gallery = route.paramMap.get('level');
    let apiEndpoint = `galleryphotosbyname/${gallery}`;
    if (!gallery) {
      apiEndpoint = `galleryphotosbyname/${route.url.toString()}`;
    }
    console.log(apiEndpoint);
    return this.api.get(apiEndpoint);
  }
}
