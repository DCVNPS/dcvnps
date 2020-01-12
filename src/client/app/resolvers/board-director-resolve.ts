import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class BoardDirectorResolve implements Resolve<Observable<any>> {
    constructor(private api: ApiService) {
    }
    resolve():  Observable<any>|Promise<any>|any {
        const apiEndpoint = 'admin/boardmembers';
        return this.api.get(apiEndpoint);
    }
}
