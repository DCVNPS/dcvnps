import { Injectable, OnInit, ɵɵcontainerRefreshEnd } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType, HttpRequest } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { ImageInfo } from '../models/imageinfo';
import { HttpErrorHandlerService, HandleError } from './http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private handleError: HandleError;
  private baseUrl = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private httpErrorHandler: HttpErrorHandlerService
  ) {
    this.handleError = this.httpErrorHandler.createHandleError('api');
  }

  get(url: string, headers?: HttpHeaders): Observable<any> {
    return this.apiRequest('GET', url, {}, headers);
  }

  // tslint:disable-next-line: ban-types
  post(url: string, body: Object, headers?: HttpHeaders) {
    return this.apiRequest('POST', url, body, headers);
  }

  // tslint:disable-next-line: ban-types
  put(url: string, body: Object, headers?: HttpHeaders) {
    return this.apiRequest('PUT', url, body, headers);
  }

  // tslint:disable-next-line: ban-types
  delete(url: string, body?: Object, headers?: HttpHeaders): Observable<any> {
    return this.apiRequest('DELETE', url, body, headers);
  }

  // tslint:disable-next-line: ban-types
  apiRequest(method: string, url: string, body?: Object, headers?: HttpHeaders): Observable<any> {
    let httpHeaders = headers;
    if (!httpHeaders) {
      if ( body instanceof FormData) {
        httpHeaders = new HttpHeaders({
          enctype: 'multipart/form-data'
        });
      } else {
        httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
      }
    }
    const options = { body, headers: httpHeaders };
    const apiEnpoint = `${this.baseUrl}/${url}`;
    return this.httpClient.request(method, apiEnpoint, options)
    .pipe(
      catchError(this.handleError<boolean>(url, false))
    );
  }

  // procedure to upload galleryphoto
  saveGalleryPhoto(url: string, body: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/${url}`, body, {
      headers: new HttpHeaders({
        enctype: 'multipart/form-data'
      }),
      reportProgress: true,
      observe: 'events'
    })
    .pipe(map((event) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          const loaded: number = event.loaded;
          const total: number = event.total ? event.total : 1;
          const progress = Math.round(100 * loaded / total);
          return { status: 'progress', message: progress };
        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    }));
  }

  saveGallery(url: string, body: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/${url}`, body, {
      headers: new HttpHeaders({
        enctype: 'multipart/form-data'
      }),
      reportProgress: true,
      observe: 'events'
    })
    // .pipe(map((event) => {
    //   switch (event.type) {
    //     case HttpEventType.UploadProgress:
    //       const loaded: number = event.loaded;
    //       const total: number = event.total ? event.total : 1;
    //       const progress = Math.round(100 * loaded / total);
    //       return { status: 'progress', message: progress };
    //     case HttpEventType.Response:
    //       return event.body;
    //     default:
    //       return `Unhandled event: ${event.type}`;
    //   }
    // }))
    ;
  }

  updateGallery(url: string, body: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/${url}`, body, {
      headers: new HttpHeaders({
        enctype: 'multipart/form-data'
      }),
      observe: 'events',
      reportProgress: true
    }).pipe(map((event) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          const loaded: number = event.loaded;
          const total: number = event.total ? event.total : 1;
          const progress = Math.round(100 * loaded / total);
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
