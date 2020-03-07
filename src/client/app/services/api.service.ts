import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { throwError, Observable, pipe } from 'rxjs';
// import { AuthService } from './auth.service';
import { ImageInfo } from '../models/image-model';
import { Gallery } from '../models/gallery.model';
import { HttpErrorHandler, HandleError } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private handleError: HandleError;
  private baseUrl = environment.apiUrl;
  private galleries: Array<Gallery> = [];

  constructor( private httpClient: HttpClient,    private httpErrorHandler: HttpErrorHandler ) {
      this.handleError = httpErrorHandler.createHandleError();
     }

  get(url: string, headers?: HttpHeaders): Observable<any> {
    return this.apiRequest('GET', url, {}, headers)
    .pipe(
      catchError(this.handleError())
    );
  }

  post(url: string, body: Object, headers?: HttpHeaders) {
    return this.apiRequest('POST', url, body, headers)
    .pipe(
      catchError(this.handleError())
    );
  }

  put(url: string, body: Object, headers?: HttpHeaders) {
    return this.apiRequest('PUT', url, body, headers)
    .pipe(
      catchError(this.handleError())
    );
  }

  delete(url: string, body?: Object, headers?: HttpHeaders): Observable<any> {
    return this.apiRequest('DELETE', url, body, headers)
    .pipe(
      catchError(this.handleError())
    );
  }

  // onRequestError(res) {
  //   if (res) {
  //     const error = {
  //       statusCode: res.status,
  //       statusText: (typeof res.error === 'string')? res.error:  res.error.message 
  //      };
  //     if (error.statusText === "jwt expired") {
  //       this.auth.logout();
  //     } else {
  //       return throwError(error);
  //     }
  //   }
  // }

  apiRequest(method: string, url: string, body?: Object, headers?: HttpHeaders): Observable<any> {
    let httpHeaders = headers;
    if (!httpHeaders) {
      httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    }
    const options = { body: body, headers: httpHeaders };
    const apiEnpoint: string = `${this.baseUrl}/${url}`;
    return this.httpClient.request(method, apiEnpoint, options)
      // .pipe(
      //   catchError(error => this.onRequestError(error))
      // );
  }

  galleryPhotoUpload(imageInfo: ImageInfo): Observable<boolean> {
    const uploadURL = `${this.baseUrl}/galleryphotos/upload/${imageInfo.gallery}/${imageInfo.year}`;
    const formData = new FormData();
    formData.append('file', imageInfo.imgFile);
    formData.append('galleryId', imageInfo.galleryid);
    formData.append('fileName', imageInfo.filename);
    formData.append('author', imageInfo.author);
    formData.append('size', imageInfo.size.toString());
    formData.append('portrait', imageInfo.portrait.toString());
    return this.httpClient.post<any>(uploadURL, formData, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      }),
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

  galleriesUpload(url: string, formData: FormData): Observable<boolean> {
    console.log(`${this.baseUrl}/${url}`);
    return this.httpClient.post<any>(`${this.baseUrl}/${url}`, formData, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data'
      }),
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
