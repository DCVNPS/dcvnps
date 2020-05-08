import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AboutUsPhotoResolverService } from './resolvers/about-us-photo-resolver.service';
import { BoardDirectorResolverService } from './resolvers/board-director-resolver.service';
import { SharedModule } from '../shared/shared.module';
import { CardImageSizeDirective } from '../shared/directives/card-image-size.directive';

const aboutusRoutes: Routes = [
  {
    path: '',
    component: AboutUsComponent,
    resolve: {
      photos: AboutUsPhotoResolverService,
      board: BoardDirectorResolverService
    }
  }
];

@NgModule({
  declarations: [
    AboutUsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(aboutusRoutes)
  ]
})
export class AboutUsModule { }
