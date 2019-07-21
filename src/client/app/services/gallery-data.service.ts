import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Photo } from '../shared/photo.model';
import { AuthorData } from '../shared/author.data.model';

@Injectable({
  providedIn: 'root'
})
export class GalleryDataService {

  private dataSource = new BehaviorSubject<AuthorData>(new AuthorData('author', 'year', []));
  data  =  this.dataSource.asObservable();
  constructor() { }
  updateData(data: AuthorData) {
    this.dataSource.next(data);
  }
}
