import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ImageInfo } from '../shared/image.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private baseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient, private auth: AuthService) { }

  public upload( imageInfo: ImageInfo): Observable<boolean> {
    const uploadURL = `${this.baseUrl}/upload/${imageInfo.gallery}/${imageInfo.year}`;
    const formData = new FormData();
    formData.append('file', imageInfo.imgFile);
    formData.append('galleryId', imageInfo.galleryid);
    formData.append('fileName', imageInfo.filename);
    formData.append('author', imageInfo.author);
    formData.append('size', imageInfo.size.toString());
    formData.append('portrait', imageInfo.portrait.toString());
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
