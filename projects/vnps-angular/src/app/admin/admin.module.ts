import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { EditorModule } from '@tinymce/tinymce-angular';
import { AdminComponent } from './admin/admin.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ManageGalleriesComponent } from './manage-galleries/manage-galleries.component';
import { ManageClassesComponent } from './manage-classes/manage-classes.component';
import { ManageAnnouncementsComponent } from './manage-announcements/manage-announcements.component';
import { AnnouncementEditComponent } from './manage-announcements/announcement-edit/announcement-edit.component';
import { AnnouncementAddComponent } from './manage-announcements/announcement-add/announcement-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassEditComponent } from './manage-classes/class-edit/class-edit.component';
import { ClassAddComponent } from './manage-classes/class-add/class-add.component';
import { UserAddComponent } from './manage-users/user-add/user-add.component';
import { UserEditComponent } from './manage-users/user-edit/user-edit.component';
import { ModalModule } from '../modal';
import { UserSetPasswordComponent } from './manage-users/user-set-password/user-set-password.component';
import { GalleryAddComponent } from './manage-galleries/gallery-add/gallery-add.component';
import { GalleryEditComponent } from './manage-galleries/gallery-edit/gallery-edit.component';
import { GalleryEditInfoComponent } from './manage-galleries/gallery-edit/gallery-edit-info.component';
import { GalleryEditPhotosComponent } from './manage-galleries/gallery-edit/gallery-edit-photos.component';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ManageUserResolverService } from './manage-users/user-resolver.service';
import { ManageClassesResolverService } from './manage-classes/manage-classes-resolver.service';
import { ManageClassAddGuard } from './manage-classes/guards/manage-class-add.guard';
import { ManageClassEditGuard } from './manage-classes/guards/manage-class-edit.guard';
import { AnnouncementResolverService } from '../announcements/resolvers/announcement-resolver.service';
import { AnnouncementAddGuard } from './manage-announcements/guards/announcement-add.guard';
import { AnnouncementEditGuard } from './manage-announcements/guards/announcement-edit.guard';
import { RoleResolverService } from './manage-users/role-resolver.service';
import { GalleriesEditResolverService } from './manage-galleries/gallery-edit/gallery-edit-resolver.service';
import { SharedModule } from '../shared/shared.module';
import { GalleryUploadPhotoComponent } from './manage-galleries/gallery-edit/gallery-upload-photo.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          {
            path: 'users',
            component: ManageUsersComponent,
            resolve: { users: ManageUserResolverService }
          },
          {
            path: 'users/add',
            component: UserAddComponent,
            resolve: { roles: RoleResolverService }
          },
          {
            path: 'users/:id/edit',
            component: UserEditComponent,
            resolve: { users: ManageUserResolverService }
          },
          {
            path: 'users/:id/setpassword',
            component: UserSetPasswordComponent,
            resolve: { users: ManageUserResolverService }
          },
          {
            path: 'classes',
            component: ManageClassesComponent,
            resolve: { classesData: ManageClassesResolverService }
          },
          {
            path: 'classes/add',
            component: ClassAddComponent,
            canDeactivate: [ManageClassAddGuard]
          },
          {
            path: 'classes/:id/edit',
            component: ClassEditComponent,
            resolve: { classesData: ManageClassesResolverService },
            canDeactivate: [ManageClassEditGuard]
          },
          {
            path: 'galleries',
            component: ManageGalleriesComponent,
            resolve: { galleries: GalleriesEditResolverService }
          },
          {
            path: 'galleries/add',
            component: GalleryAddComponent
          },
          {
            path: 'galleries/:id/edit',
            component: GalleryEditComponent,
            resolve: { galleries: GalleriesEditResolverService },
            children: [
              { path: '', redirectTo: 'info', pathMatch: 'full'},
              {
                path: 'info',
                component: GalleryEditInfoComponent
              },
              {
                path: 'photos',
                component: GalleryEditPhotosComponent
              },
              {
                path: 'upload',
                component: GalleryUploadPhotoComponent
              }
            ]
          },
          {
            path: 'announcements',
            component: ManageAnnouncementsComponent,
            resolve: { announcements: AnnouncementResolverService },
          },
          {
            path: 'announcements/add',
            canDeactivate: [ AnnouncementAddGuard ],
            component: AnnouncementAddComponent
          },
          {
            path: 'announcements/:id/edit',
            component: AnnouncementEditComponent,
            canDeactivate: [ AnnouncementEditGuard ],
            resolve: { announcements: AnnouncementResolverService }
          },
          { path: '', redirectTo: 'users', pathMatch: 'full' }
        ]
      }
    ]
  }
];

@NgModule({
  declarations: [
    AdminComponent,
    ManageUsersComponent,
    ManageGalleriesComponent,
    ManageClassesComponent,
    ManageAnnouncementsComponent,
    AnnouncementEditComponent,
    AnnouncementAddComponent,
    ClassEditComponent,
    ClassAddComponent,
    UserAddComponent,
    UserEditComponent,
    UserSetPasswordComponent,
    GalleryAddComponent,
    GalleryEditComponent,
    GalleryEditInfoComponent,
    GalleryEditPhotosComponent,
    GalleryUploadPhotoComponent
  ],
  imports: [
    CommonModule,
    EditorModule,
    FormsModule,
    ReactiveFormsModule,
    ModalModule,
    SharedModule,
    [RouterModule.forChild(adminRoutes)]
  ]
})
export class AdminModule { }
