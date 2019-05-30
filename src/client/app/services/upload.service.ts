import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Gallery } from '../shared/gallery.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private baseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient, private auth: AuthService) { }

  // public upload(file: File, upldGallery: Gallery, upldYear: string): Observable<boolean> {
  //   const uploadURL = `${this.baseUrl}/upload/${upldGallery.gallery}/${upldYear}`;
  //   // console.log(file);
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('galleryId', upldGallery.galleryId);
  //   return this.httpClient.post<any>(uploadURL, formData, {
  //     headers: new HttpHeaders({'enctype': 'multipart/form-data',
  //     'Authorization': `Bearer ${this.auth.getToken()}`}),
  //     reportProgress: true,
  //     observe: 'events'
  //   }).pipe(map((event) => {

  //     switch (event.type) {

  //       case HttpEventType.UploadProgress:
  //         const progress = Math.round(100 * event.loaded / event.total);
  //         return { status: 'progress', message: progress };

  //       case HttpEventType.Response:
  //         return event.body;
  //       default:
  //         return `Unhandled event: ${event.type}`;
  //     }
  //   })
  //   );
  // }
  public upload(file: File, upldGallery: Gallery, upldYear: string, portraitInd: boolean): Observable<boolean> {
    const uploadURL = `${this.baseUrl}/upload/${upldGallery.gallery}/${upldYear}`;
    // console.log(file);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('galleryId', upldGallery.galleryId);
    formData.append('portraitInd', portraitInd.toString());
    return this.httpClient.post<any>(uploadURL, formData, {
      headers: new HttpHeaders({'enctype': 'multipart/form-data',
      'Authorization': `Bearer ${this.auth.getToken()}`}),
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {

      switch (event.type) {

        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', message: progress };

        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    })
    );
  }
}
