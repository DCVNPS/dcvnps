import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';
import { ActivatedRoute, Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Photo } from '../../shared/models/interfaces';
import { ApiService } from '../../api/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AboutUsPhotoResolverService implements Resolve<Observable<Photo[]>> {
  constructor(private apiService: ApiService) { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Photo[]> {
    // console.log({route, state});
    const apiUrl = `galleryphotos/name${state.url}`;
    const photoArray: Photo[] = [];
    return this.apiService.get(apiUrl).pipe(
      take(1),
      mergeMap( data => {
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
        // console.log(photoArray);
        return of(photoArray);
      })
    );
  }
}
