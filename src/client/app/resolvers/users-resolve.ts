import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class UsersResolve implements Resolve<Observable<any>> {
    constructor(private api: ApiService) {
    }
    resolve(route: ActivatedRouteSnapshot):  Observable<any>|Promise<any>|any {
        const userid = route.params.userid || null;
        const apiEndpoint = `admin/user/${userid}`;
        // console.log(apiEndpoint);
        return this.api.get(apiEndpoint);
    }
}
