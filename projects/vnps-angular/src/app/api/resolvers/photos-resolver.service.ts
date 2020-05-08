import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthorPhotos, GalleryData } from '../../shared/models/interfaces';
import { ApiService } from '../services/api.service';
import { Observable, of } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotosResolverService implements Resolve<GalleryData> {
  constructor(private apiService: ApiService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GalleryData> | Promise<GalleryData> {
    const apiUrl = `galleryphotos/name/${route.params.gallery}`;
    const years: Array<string> = [];
    const authData: Array<AuthorPhotos> = [];
    return this.apiService.get(apiUrl).pipe(
      take(1),
      mergeMap( data => {
        // console.log(data);
        data.forEach( (yearData: any) => {
          years.push(yearData.year);
          yearData.authorData.forEach( (authPhotos: AuthorPhotos) => {
            authData.push(authPhotos);
          });
        });
        const galleryData: GalleryData = { years, authorData: authData };
        return of(galleryData);
      })
    );
  }

}
