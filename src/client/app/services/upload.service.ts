import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private baseUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) { }
  
  public upload(file:File, upldGallery:string,upldYear:string):Observable<boolean>{
    let uploadURL = `${this.baseUrl}/upload/${upldGallery}/${upldYear}`;
    // console.log(file);
    const formData = new FormData();
    formData.append('file',file);
    return this.httpClient.post<any>(uploadURL, formData, {
      headers: {'enctype': 'multipart/form-data'},
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
