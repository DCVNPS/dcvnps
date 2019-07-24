import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryPhotosResolve implements Resolve<Observable<any>> {
  constructor(private api: ApiService) {
  }
  resolve(route: ActivatedRouteSnapshot): Observable<any>|Promise<any>|any {
    const gallery = route.paramMap.get('level');
    let apiEndpoint = `galleryphotosbyname/${gallery}`;
    if (!gallery) {
      apiEndpoint = (route.url.toString() === 'quicktest') ? 'galleryphotosbyname/home' : `galleryphotosbyname/${route.url.toString()}`;
    }
      // console.log(apiEndpoint);
      return this.api.get(apiEndpoint);
  }
}
