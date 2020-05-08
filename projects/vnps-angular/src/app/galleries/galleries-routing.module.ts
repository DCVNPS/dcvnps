import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleriesComponent } from './galleries/galleries.component';
import { GalleryDetailComponent } from './gallery-detail/gallery-detail.component';
import { GalleryListComponent } from './gallery-list/gallery-list.component';
import { GalleriesResolverService } from '../api/resolvers/galleries-resolver.service';
import { PhotosResolverService } from '../api/resolvers/photos-resolver.service';

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
                path: '/gallerylist',
                component: GalleryListComponent,
                resolve: { galleries: GalleriesResolverService }
            },
            {
                path: '',
                redirectTo: '/gallerylist',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(galleriesRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class GalleriesRoutingModule { }
