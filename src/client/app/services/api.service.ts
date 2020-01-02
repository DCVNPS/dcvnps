import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { throwError, Observable, pipe } from 'rxjs';
import { AuthService } from './auth.service';
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

  constructor(
    private httpClient: HttpClient,
    private auth: AuthService) { }

  get(url: string, headers?: HttpHeaders): Observable<any> {
    return this.apiRequest('GET', url, {}, headers);
  }

  post(url: string, body: Object, headers?: HttpHeaders) {
    return this.apiRequest('POST', url, body, headers);
  }

  put(url: string, body: Object, headers?: HttpHeaders) {
    return this.apiRequest('PUT', url, body, headers);
  }

  delete(url: string, body?: Object, headers?: HttpHeaders): Observable<any> {
    return this.apiRequest('DELETE', url, body, headers);
  }

  onRequestError(res) {
    if (res) {
      // console.log(res);
      const jerror = res.error;
      const error = {
        statusCode: res.status,
        statusText: jerror.authmsg
      };
      // console.log(error);
      if (error.statusText === "jwt expired") {
        this.auth.logout();
      } else {
        return throwError(error);
      }
    }
  }

  apiRequest(method: string, url: string, body?: Object, headers?: HttpHeaders): Observable<any> {
    let httpHeaders = headers;
    if (!httpHeaders) {
      httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });
    }
    const options = { body: body, headers: httpHeaders };
    return this.httpClient.request(method, `${this.baseUrl}/${url}`, options)
      .pipe(
        catchError(error => this.onRequestError(error))
      );
  }

  upload(imageInfo: ImageInfo): Observable<boolean> {
    const uploadURL = `${this.baseUrl}/galleries/upload/${imageInfo.gallery}/${imageInfo.year}`;
    const formData = new FormData();
    formData.append('file', imageInfo.imgFile);
    formData.append('galleryId', imageInfo.galleryid);
    formData.append('fileName', imageInfo.filename);
    formData.append('author', imageInfo.author);
    formData.append('size', imageInfo.size.toString());
    formData.append('portrait', imageInfo.portrait.toString());
    return this.httpClient.post<any>(uploadURL, formData, {
      headers: new HttpHeaders({
        'enctype': 'multipart/form-data',
        'Authorization': `Bearer ${this.auth.getToken()}`
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
