import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Gallery } from '../shared/gallery.model';

@Injectable({
    providedIn: 'root'
})

export class GalleriesResolve implements Resolve<Array<Gallery>> {
    private galleries: Array<Gallery> = [];
    constructor(private api: ApiService) {
    }
    resolve(route: ActivatedRouteSnapshot): Array<Gallery> {
        const galleryId = route.paramMap.get('galleryId');
        const apiEndpoint = (galleryId) ? `galleries/${galleryId}` : `galleries`;
        // console.log(apiEndpoint);
        this.api.get(apiEndpoint)
            .subscribe(data => {
                data.forEach((item) => {
                    this.galleries.push(item);
                });
        });
        return this.galleries;
    }
}
