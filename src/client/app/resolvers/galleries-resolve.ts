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
        return this.api.getGalleries(galleryId);
    }
}
