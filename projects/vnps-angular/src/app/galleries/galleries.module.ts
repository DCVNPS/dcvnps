import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { GalleriesComponent } from './galleries/galleries.component';
import { GalleryDetailComponent } from './gallery-detail/gallery-detail.component';
import { AuthorPhotoComponent } from '../shared/author-photo/author-photo.component';
import { SharedModule } from '../shared/shared.module';
import { GalleryListComponent } from './gallery-list/gallery-list.component';
import { PhotosResolverService } from '../api/resolvers/photos-resolver.service';
import { GalleriesResolverService } from '../api/resolvers/galleries-resolver.service';

const galleriesRoutes: Routes = [
  {
      path: '',
      component: GalleriesComponent,
      children: [
          {
              path: ':gallery',
              component: GalleryDetailComponent,
              resolve: {
                  galleryData: PhotosResolverService
              }
          },
          {
              path: './gallerylist',
              component: GalleryListComponent,
              resolve: { galleries: GalleriesResolverService }
          },
          {
              path: '',
              redirectTo: './gallerylist',
              pathMatch: 'full'
          }
      ]
  }
];

@NgModule({
  declarations: [
    GalleriesComponent,
    GalleryDetailComponent,
    GalleryListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(galleriesRoutes)
  ],
  exports: [
    AuthorPhotoComponent
  ]
})
export class GalleriesModule { }
