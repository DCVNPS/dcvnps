import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HomePhotoResolverService } from './home-photo-resolver.service';
import { HomeGalleryResolverService } from './home-gallery-resolver.service';


const homeRoutes: Routes = [
  { path: 'home',
    component: HomeComponent,
    resolve: {
      photos: HomePhotoResolverService,
      galleries: HomeGalleryResolverService
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(homeRoutes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
