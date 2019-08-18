import { Injectable } from '@angular/core';
import { Http, Headers, Request, RequestOptions, RequestMethod, Response } from '@angular/http';
import { HttpClient, HttpHeaders, HttpEventType } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { throwError, Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { ImageInfo } from '../models/image-model';
import { Gallery } from '../models/gallery.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl = environment.apiUrl;
  private galleries: Array<Gallery> = [];

  constructor(private http: Http, private httpClient: HttpClient, private auth: AuthService) { }

  get(url: string, headers?: Headers) {
    return this.request(url, RequestMethod.Get, headers);
  }

  post(url: string, body: Object, headers?: Headers) {
    return this.request(url, RequestMethod.Post, body, headers);
  }

  put(url: string, body: Object, headers?: Headers) {
    return this.request(url, RequestMethod.Put, body, headers);
  }

  delete(url: string, body?: Object, headers?: Headers) {
    return this.request(url, RequestMethod.Delete, body, headers);
  }

  // this acts as an intercepter
  request(url: string, method: RequestMethod, body?: Object, reqHeaders?: Headers): Observable<any> {
    let headers = reqHeaders;
    if (!headers) {
      headers = new Headers();
      headers.append('Content-Type', 'application/json');
    }
    // headers.append('Authorization', `Bearer ${this.auth.getToken()}`);
    const authToken = this.auth.getToken() || environment.defaultAuthToken;
    headers.append('Authorization', `Bearer ${authToken}`);

    const requestOptions = new RequestOptions({
      url: `${this.baseUrl}/${url}`,
      method: method,
      headers: headers
    });

    if (body) {
      // console.log(body);
      requestOptions.body = body;
    }

    const request = new Request(requestOptions);
    // console.log(requestOptions);
    return this.http.request(request)
      .pipe(
        map((res: Response) => res.json()),
        catchError((res: Response) => this.onRequestError(res))
      );
  }

  onRequestError(res: Response) {
    if (res) {
      console.log(res);
      const error = {
        statusCode: res.status,
        error: res.statusText
      };
      return throwError(error);
    }
  }

  upload(imageInfo: ImageInfo): Observable<boolean> {
    const uploadURL = `${this.baseUrl}/upload/${imageInfo.gallery}/${imageInfo.year}`;
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
