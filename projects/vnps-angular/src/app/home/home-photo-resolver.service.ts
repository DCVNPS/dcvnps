import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Photo } from '../shared/models/interfaces';
import { ApiService } from '../api/services/api.service';
import { Observable, of } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HomePhotoResolverService implements Resolve<Array<Photo>> {

  constructor(private apiService: ApiService, private router: Router) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<Photo>> {
    const apiUrl = 'galleryphotos/name/home';
    const photoArray: Array<Photo> = [];
    return this.apiService.get(apiUrl).pipe(
      take(1),
      mergeMap( data => {
        // console.log(data);
        data.forEach( (yearData: any) => {
          yearData.authorData.forEach( (author: any) => {
            author.photos.forEach( (photo: any) => {
              photoArray.push({
                photoId: photo.photoId,
                galleryId: photo.galleryId,
                gallery: photo.gallery,
                imgalt: photo.imgalt,
                imgsrc: photo.imgsrc,
                portrait: photo.portrait,
                hidden: false});
            });
          });
        });
        return of(photoArray);
      })
    );
  }
}
