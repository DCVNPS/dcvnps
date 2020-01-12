import { Injectable } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class EditGalleryResolve implements Resolve<Observable<any>> {
    constructor(private api: ApiService) {
    }
    resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
        const { gallery, year, author } = route.params;
        // console.log({gallery, year, author});
        let apiEndpoint = `galleries/photosbyname/${gallery}`;
        apiEndpoint += year ? `/${year}` : null;
        apiEndpoint += author ? `/${author}` : null;
        // console.log(`EditGalleryResolve ${apiEndpoint}`);
        return this.api.get(apiEndpoint);
    }
}
