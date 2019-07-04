import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Slide } from '../shared/slide.model';
import { ApiService } from '../services/api.service';

@Injectable({
    providedIn: 'root'
})

export class NonGalleryPhotosResolve implements Resolve<Array<Slide>> {
    private slides: Array<Slide>;
    constructor(private api: ApiService) {
        this.slides = [];
    }
    resolve(route: ActivatedRouteSnapshot): Array<Slide> {
        this.slides = [];
        this.getHomePhotos(route);
        return this.slides;
    }

    getHomePhotos(route: ActivatedRouteSnapshot) {
        const urlEnpoint = `galleryphotosbyname/${route.url.toString()}`;
        // console.log(urlEnpoint);
        this.api.get(urlEnpoint)
            .subscribe(data => {
                // console.log(data);
                let cnt = 0;
                data.forEach((item) => {
                    item.yeardata.forEach(ydt => {
                        ydt.photos.forEach(photo =>{
                            this.slides.push(new Slide(
                                photo.galleryPhotoId,
                                photo.galleryId,
                                item.year,
                                ydt.author,
                                cnt,
                                `/galleries/${photo.gallery}/${item.year}/${photo.photoImg}`,
                                `${photo.photoImg.replace(/\.jpg$|\.bmp$/i,'')}`,
                                photo.portrait === 1,
                                true
                            ));
                            cnt += 1;
                        })
                    })
                });
            });
    }
}
