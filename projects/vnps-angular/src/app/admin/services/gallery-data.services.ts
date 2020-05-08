import { Injectable } from '@angular/core';
import { Gallery } from '../../shared/models/interfaces';
import { ApiService } from '../../api/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class GalleryDataService {

  private galleries$: Array<Gallery> = [];
  constructor(
    private api: ApiService
  ) { }
  get Galleries(): Array<Gallery> {
    if (this.galleries$.length === 0 || !this.galleries$ ) {
      this.getGallery();
      return this.galleries$;
    } else {
      return this.galleries$;
    }
  }

  set Galleries(galleries: Array<Gallery>) {
    if (galleries) {
      this.galleries$ = galleries;
    }
  }

  getGallery() {
    this.api.get('commons/galleries')
    .subscribe( async data => {
      await Array.from(data).forEach((item: Gallery) => {
        this.galleries$.push(item);
      });
    });
  }

}
