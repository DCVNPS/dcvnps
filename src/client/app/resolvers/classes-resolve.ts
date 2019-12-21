import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';
import { PhotoClass } from '../models/photo-class';

@Injectable({
    providedIn: 'root'
})

export class ClassesResolve implements Resolve<Observable<any>> {
    private apiEndpoint: string;
    private classLevel: string;
    constructor(private api: ApiService) {
    }
    resolve(route: ActivatedRouteSnapshot):  Observable<any>|Promise<any>|any {
        const classLevel = route.paramMap.get('level');
        this.apiEndpoint = (classLevel)?`photoclasses/${classLevel}`:`photoclases`;
        // this.apiEndpoint = 'photoclasses';
    //    console.log(this.apiEndpoint);
        return this.api.get(this.apiEndpoint);
    }
 
}
