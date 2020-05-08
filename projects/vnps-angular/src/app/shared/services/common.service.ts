import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  getYearLov(thisYear: number): Array<string> {
    const yearLov: Array<string> = [];
    for ( let i = thisYear - 5; i < thisYear + 10; i++) {
      yearLov.push(i.toString());
    }
    return yearLov;
  }
}
