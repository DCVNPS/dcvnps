import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { GalleriesComponent } from './galleries/galleries.component';
import { ProgramsComponent } from './programs/programs.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { QuickTestComponent } from './quick-test/quick-test.component';
import { GalleryComponent } from './gallery/gallery.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'contacts',
    component: ContactListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'newcontact',
    component: AddContactComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'fileupload',
    component: FileUploadComponent
  },
  {
    path: 'gallery/:level',
    component: GalleryComponent
  },
  {
    path: 'galleries',
    component: GalleriesComponent
  },
  {
    path: 'programs/:level',
    component: ProgramsComponent,
    
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
    component: AboutusComponent
  },
  {
    path: 'quicktest',
    component: QuickTestComponent
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
