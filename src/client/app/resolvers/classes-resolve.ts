import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ClassesResolve implements Resolve<Observable<any>> {
    private apiEndpoint: string;
    private classLevel: string;
    constructor(private api: ApiService) {
    }
    resolve(route: ActivatedRouteSnapshot):  Observable<any>|Promise<any>|any {
        const classid = route.paramMap.get('classid');
        this.apiEndpoint = (classid)?`photoclasses/${classid}`:`photoclasses`;
        // this.apiEndpoint = 'photoclasses';
        return this.api.get(this.apiEndpoint);
    }
 
}
