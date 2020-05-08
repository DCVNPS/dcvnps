import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Gallery } from '../../../shared/models/interfaces';
import { ApiService } from '../../../api/services/api.service';
import { Observable, of } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GalleriesEditResolverService implements Resolve<Array<Gallery>> {

  constructor(private apiService: ApiService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<Gallery>> | Promise<Array<Gallery>> {
    const galleryId = route.paramMap.get('id');
    const apiUrl = galleryId ? `galleries/${galleryId}` : 'galleries';
    const galleryArray: Array<Gallery> = [];
    return this.apiService.get(apiUrl).pipe(
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
