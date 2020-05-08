import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SelectivePreloadingStrategyService } from './selective-preloading-strategy.service';
import { AuthGuard } from './auth/guards/auth.guard';
import { GalleriesModule } from './galleries/galleries.module';
import { AnnouncementsModule } from './announcements/announcements.module';
import { ShellComponent } from './shell/shell.component';
import { HomeComponent } from './home/home/home.component';
import { HomePhotoResolverService } from './home/home-photo-resolver.service';
import { HomeGalleryResolverService } from './home/home-gallery-resolver.service';
import { ChangePasswordComponent } from './auth/change-password/change-password.component';


const appRoutes: Routes = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        resolve: {
          photos: HomePhotoResolverService,
          galleries: HomeGalleryResolverService
        }
      },
      {
        path: 'changepassword',
        component: ChangePasswordComponent
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canLoad: [AuthGuard]
      },
      {
        path: 'vnpsclasses/:level',
        loadChildren: () => import('./classes/classes.module').then( m => m.ClassesModule)
      },
      {
        path: 'galleries',
        loadChildren: () => import('./galleries/galleries.module').then(m => GalleriesModule),
        data: { preload: true }
      },
      {
        path: 'announcements',
        loadChildren: () => import('./announcements/announcements.module').then(m => AnnouncementsModule)
      },
      {
        path: 'aboutus',
        loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule)
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes,
      {
        enableTracing: false, // <-- debugging purpose only
        preloadingStrategy: SelectivePreloadingStrategyService,
      })
  ],
  providers: [],
  exports: [RouterModule]
})
export class AppRoutingModule { }
