import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Slide } from '../shared/slide.model';
import { ApiService } from '../services/api.service';

@Injectable()

export class HomeGalleryResolve implements Resolve<Array<Slide>> {
    private slides: Array<Slide> = [];
    constructor(private api: ApiService) { }
    resolve() {
        this.getHomePhotos();
        return this.slides;
    }

    getHomePhotos() {
        this.api.get('galleryphotosbyname/home')
            .subscribe(data => {
                // console.log(data);
                let cnt = 0;
                data.forEach((item) => {
                    item.photos.forEach((photo) => {
                        // console.log(`year: ${item.year} -- photoUrl: ${photo.photoUrl} -- portrait:${photo.portrait}`);
                        this.slides.push(new Slide(photo.galleryPhotoId,
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
    }
}