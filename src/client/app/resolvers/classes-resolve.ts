import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ClassesResolve implements Resolve<Observable<any>> {
    private apiEndpoint: string;
    constructor(private api: ApiService) {
    }
    resolve(route: ActivatedRouteSnapshot):  Observable<any>|Promise<any>|any {
        // const classid = route.paramMap.get('classid');
        // this.apiEndpoint = (classid)?`vnpsclasses/byid/${classid}`:`vnpsclasses/byid`;
        const classlevel = route.paramMap.get('classlevel');
        this.apiEndpoint = (classlevel)?`vnpsclasses/bylevel/${classlevel}`:`vnpsclasses/bylevel`;
        console.log(this.apiEndpoint);
        return this.api.get(this.apiEndpoint);
    }

}
