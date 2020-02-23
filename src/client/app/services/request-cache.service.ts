import { Injectable } from '@angular/core';
import { HttpResponse, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { MessageService } from './message.service';
import { environment } from '../../environments/environment';

export interface RequestCacheEntry {
  url: string;
  response: HttpResponse<any>;
  lastRead: number;
}

export abstract class RequestCache{
  abstract get(req: HttpRequest<any>): HttpResponse<any> | undefined;
  abstract put(req: HttpRequest<any>, response: HttpResponse<any>): void;
}

@Injectable({
  providedIn: 'root'
})
export class RequestCacheService implements RequestCache {
  
  cache = new Map<string, RequestCacheEntry>();

  constructor(private messenger: MessageService) { }
  // constructor() { }

  // get cached reponse if exists, return undefined otherwise.
  get(req: HttpRequest<any>): HttpResponse<any> | undefined{
    const url = req.urlWithParams;
    const cached = this.cache.get(url);
    if (!cached){
      return undefined;
    }
    // check if cached data is expired or not.
    const isExpired = cached.lastRead < Date.now() - environment.cacheExpiration;
    const expired = isExpired ? 'expired' : '';
    // this.messenger.add(`Found ${expired} response for ${url}.`);
    return isExpired ? undefined : cached.response;

  }

  put(req: HttpRequest<any>, response: HttpResponse<any>):void{
    const url = req.urlWithParams;
    // this.messenger.add(`Caching reponse from "${url}".`);
    const cacheEntry = {url, response, lastRead: Date.now()};
    this.cache.set(url, cacheEntry);
    // Remove expired cached entries
    const expired = Date.now() - environment.cacheExpiration;
    this.cache.forEach( entry => {
      if(entry.lastRead < expired){
        this.cache.delete(entry.url);
      }
    });
    // this.messenger.add(`Request cache size: ${this.cache.size}.`);
  }

}
