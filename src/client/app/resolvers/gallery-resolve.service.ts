import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute } from '@angular/router';
import { Slide } from '../shared/slide.model';
import { Observable } from 'rxjs';
import { GalleryDataModel } from '../shared/gallery-data-model';

@Injectable({
  providedIn: 'root'
})
export class GalleryResolveService implements Resolve<GalleryDataModel> {
  level: string;
  years: Array<string>;
  private selectedPhotos: Array<Slide>;
  photos: Array<Slide>;
  galleryData: GalleryDataModel;
  constructor(private api: ApiService, private route: ActivatedRoute) {
   }
  resolve(): Observable<GalleryDataModel> {
    this.years = [];
    this.photos = [];
    this.getGalleryPhotos();
    // return { 'level': this.level, 'years': this.years, 'photos': this.photos };
    console.log(this.galleryData);
    return this.galleryData;
  }
  getGalleryPhotos() {
    this.route.params.subscribe(params => {
      this.level = params['level'];
      this.years = [];
      this.photos = [];
      this.selectedPhotos = [];
      this.api.get(`/galleryphotosbyname/${this.level}`)
        .subscribe(data => {
          let cnt = 0;
          data.forEach((item) => {
            this.years.push(item.year);
            item.photos.forEach((photo) => {
              // console.log(`year: ${item.year} -- photoUrl: ${photo.photoUrl} -- portrait:${photo.portrait}`);
              this.selectedPhotos.push(new Slide(photo.galleryPhotoId,
                photo.galleryId,
                item.year,
                'dummy note',
                cnt,
                `/galleries/${photo.gallery}/${item.year}/${photo.photoImg}`,
                `${photo.photoImg.replace(/\.jpg$|\.bmp$/i, '')}`,
                item.portrait === 1,
                true));
              cnt += 1;
            });
          });
        });
        this.photos = this.selectedPhotos;
        this.galleryData = new GalleryDataModel();
        this.galleryData.level = this.level;
        this.galleryData.years = this.years;
        this.galleryData.photos = this.photos;
        this.galleryData.selectedPhotos = this.selectedPhotos;
        });
  }
}
