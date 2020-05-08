import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { MessageService } from './services/message.service';
import { HttpErrorHandlerService } from './services/http-error-handler.service';
import { CacheInterceptorProviders } from './interceptors';
import { GalleriesResolverService } from './resolvers/galleries-resolver.service';
import { PhotosResolverService } from './resolvers/photos-resolver.service';
import { AdminlevelDataService } from './services/adminlevel-data.service';



@NgModule({
  declarations: [ ],
  providers: [
    ApiService,
    MessageService,
    HttpErrorHandlerService,
    CacheInterceptorProviders,
    GalleriesResolverService,
    PhotosResolverService,
    AdminlevelDataService
  ],
  imports: [
    CommonModule
  ],
  exports: []
})
export class ApiModule { }
