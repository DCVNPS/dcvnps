import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthorData } from '../models/author.data.model';

@Injectable({
  providedIn: 'root'
})
export class GalleryDataService {

  private dataSource = new BehaviorSubject<any>({});
  data  =  this.dataSource.asObservable();
  constructor() { }
  updateData(data: any) {
    this.dataSource.next(data);
  }
}
