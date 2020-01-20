import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { QuickTestComponent } from './quick-test/quick-test.component';
import { GalleryComponent } from './gallery/gallery.component';
import { DropzoneComponent } from './dropzone/dropzone.component';
import { GalleryPhotosResolve } from './resolvers/gallery-photos-resolve';
import { EditPersonalGalleryComponent } from './gallery/edit-personal-gallery/edit-personal-gallery.component';
import { GalleriesResolve } from './resolvers/galleries-resolve';
import { BoardDirectorResolve } from './resolvers/board-director-resolve';
import { ManageSiteComponent } from './manage-site/manage-site.component';
import { EditGalleryResolve } from './resolvers/edit-gallery-resolve';
import { NewUserComponent } from './users/new-user/new-user.component';
import { RoleResolve } from './resolvers/role-resolve';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { VnpsClassesComponent } from './vnps-classes/vnps-classes.component';
import { ClassesResolve } from './resolvers/classes-resolve';
import { ClassMenuResolve } from './resolvers/class-menu-resolve';
import { CampingRegistrationComponent } from './registrations/camping-registration/camping-registration.component';
import { ClassRegistrationComponent } from './registrations/class-registration/class-registration.component';
import { StatesResolve } from './resolvers/states-resolve';
import { SetPasswordComponent } from './users/set-password/set-password.component';
import { UsersResolve } from './resolvers/users-resolve';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      photos: GalleryPhotosResolve,
      galleries: GalleriesResolve
    }
  },
  {
    path: 'newuser',
    component: NewUserComponent,
    canActivate: [AuthGuard],
    resolve: {
      roles: RoleResolve
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'edituser',
    component: EditUserComponent,
    canActivate: [AuthGuard],
    resolve:{
      roles: RoleResolve,
      user: UsersResolve
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'changepassword',
    component: ChangePasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'setpassword',
    component: SetPasswordComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'fileupload',
    component: DropzoneComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'gallery/level',
    component: GalleryComponent
  },
 {
    path: 'editpersonalgallery/:gallery/:year/:author',
    component: EditPersonalGalleryComponent,
    canActivate: [AuthGuard],
    resolve: {
      galleryData: EditGalleryResolve
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'managesite',
    component: ManageSiteComponent,
    canActivate: [AuthGuard],
    resolve: {
      galleries: GalleriesResolve
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'vnpsclasses/:classlevel',
    component: VnpsClassesComponent,
    resolve: {
      classesData: ClassesResolve,
      classMenu: ClassMenuResolve
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'announcements',
    component: AnnouncementsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'aboutus',
    component: AboutusComponent,
    resolve: {
      photos: GalleryPhotosResolve,
      board: BoardDirectorResolve
    }
  },
  {
    path: 'campingregistration',
    component: CampingRegistrationComponent
    , resolve: {
      states: StatesResolve
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'classregistration',
    component: ClassRegistrationComponent
    , resolve: {
      states: StatesResolve,
      classMenu: ClassMenuResolve
    },
    runGuardsAndResolvers: 'always'
  },
  {
    path: 'quicktest',
    component: QuickTestComponent,
    resolve: {
      photos: GalleryPhotosResolve,
      galleries: GalleriesResolve
    }
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
