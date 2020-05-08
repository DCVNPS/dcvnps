import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Announcements } from '../../shared/models/interfaces';
import { ApiService } from '../../api/services/api.service';
import { Observable, of } from 'rxjs';
import { take, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementResolverService implements Resolve<Announcements> {

  constructor(private apiService: ApiService, private router: Router) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Announcements> {
    const apiUrl = route.params.id ? `announcements/${route.params.id}` : 'announcements';
    // console.log(apiUrl);
    return this.apiService.get(apiUrl).pipe(
      take(1),
      mergeMap( data => {
        return of(data);
      })
    );
  }

}
