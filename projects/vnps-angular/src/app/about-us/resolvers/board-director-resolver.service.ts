import { Injectable } from '@angular/core';
import { BoardMember } from '../../shared/models/interfaces';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ApiService } from '../../api/services/api.service';
import { take, map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BoardDirectorResolverService implements Resolve<Observable<Array<BoardMember>>> {
  constructor(private api: ApiService) {  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Array<BoardMember>> {
      const apiEndpoint = 'boardmembers';
      const boardMember: BoardMember[] = [];
      return this.api.get(apiEndpoint).pipe(
        take(1),
        // mergeMap( data => {
        //   data.forEach( (d: BoardMember) => {
        //     console.log(d);
        //     boardMember.push(d);
        //   });
        //   return of(boardMember);
        // })
        mergeMap( data => of(data))
      );
  }
}
