import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { map } from 'rxjs/operators';
import { ApiService } from '../services/api.service';
import { Gallery } from '../models/gallery.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class GalleriesResolve implements Resolve<Observable<any> >{
    
    private galleries: Array<Gallery> =[];
    constructor(private api: ApiService) {
    }

    resolve(route: ActivatedRouteSnapshot):   Observable<any>|Promise<any>|any {
        const galleryId = route.paramMap.get('galleryId') || null;
        const apiEndpoint = (galleryId) ? `galleries/${galleryId}` : `galleries`;
        this.api.get(apiEndpoint)
        .subscribe(
            data => {
                // console.log(data);
                data.forEach( item =>{
                    const curGallery = this.galleries.find(g => g.gallery === item.gallery);
                    if( !curGallery &&item.gallery !== 'home' && item.gallery !== 'aboutus'){
                        this.galleries.push(new Gallery(
                            item.galleryId,
                            item.gallery,
                            item.profilePhoto,
                            item.createdDate,
                            item.updatedDate))
                    }
                })
            },
            error =>{
                console.log(error);
            });
            return this.galleries;
   }
}
