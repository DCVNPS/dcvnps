import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DcvnpsDataService {
  private dataSource = new BehaviorSubject<Object>({});
  data  =  this.dataSource.asObservable();
  constructor() { }
  updateData(data: any){
    this.dataSource.next(data);
  }

}
