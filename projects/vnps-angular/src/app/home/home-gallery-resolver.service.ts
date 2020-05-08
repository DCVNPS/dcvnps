import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Gallery } from '../shared/models/interfaces';
import { ApiService } from '../api/services/api.service';
import { Observable, of } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomeGalleryResolverService implements Resolve<Array<Gallery>> {

  constructor(private apiService: ApiService, private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<Gallery>> {
    const apiUrl = 'galleryphotos/galleryname/home';
    const galleryArray: Array<Gallery> = [];
    return this.apiService.get('commons/galleries').pipe(
      take(1),
      mergeMap( (data: any) => {
        data.forEach( (item: Gallery) => {
          if (!galleryArray.some(i => i.gallery === item.gallery)) {
            if (item.gallery !== 'home' && item.gallery !== 'aboutus') {
              galleryArray.push(item);
            }
          }
        });
        return of(galleryArray);
      })
    );
  }
}
