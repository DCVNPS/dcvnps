import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Gallery } from '../models/gallery.model';

@Injectable({
    providedIn: 'root'
})

export class GalleriesResolve implements Resolve<Array<Gallery>> {
    private galleries: Array<Gallery> = [];
    constructor(private api: ApiService) {
    }
    resolve(route: ActivatedRouteSnapshot): Array<Gallery> {
        const galleryId = route.paramMap.get('galleryId');
        return this.getGalleries(galleryId);
    }
    getGalleries(galleryId?): Array<Gallery> {
        const apiEndpoint = (galleryId) ? `galleries/${galleryId}` : `galleries`;
        this.api.get(apiEndpoint)
            .subscribe(data => {
                data.forEach(item => {
                    const g = this.galleries.find(i => i.gallery === item.gallery);
                    if (!g && item.gallery !== 'home' && item.gallery !== 'aboutus') {
                        this.galleries.push(new Gallery(
                            item.galleryId,
                            item.gallery,
                            item.profilePhoto,
                            item.createdDate,
                            item.updatedDate))
                    }
                });
                // console.log(this.galleries);
            });
        return this.galleries;
    }
}
