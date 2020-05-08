/* "Barrel" of Http Interceptors */
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { CachingInterceptor } from './caching.interceptor';

export const CacheInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true }
];
