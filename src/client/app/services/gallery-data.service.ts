import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalleryDataService {

  private dataSource = new BehaviorSubject<Array<any>>([]);
  data  =  this.dataSource.asObservable();
  constructor() { }
  updateData(data: any){
    this.dataSource.next(data);
  }
}
