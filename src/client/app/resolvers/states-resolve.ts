import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class StatesResolve implements Resolve<Observable<any>> {
    constructor(private api: ApiService) {
    }
    resolve():  Observable<any>|Promise<any>|any {
        return this.api.get('states');
    }
}
