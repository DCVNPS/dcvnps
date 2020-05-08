import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { AnnouncementResolverService } from './resolvers/announcement-resolver.service';
import { SharedModule } from '../shared/shared.module';

const announcementRoutes: Routes = [
  { path: '',
    component: AnnouncementsComponent,
    children: [
      { path: '',
        component: AnnouncementComponent,
        resolve: { announcements: AnnouncementResolverService }
      }
    ]
  },
];

@NgModule({
  declarations: [
    AnnouncementsComponent,
    AnnouncementComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(announcementRoutes)
  ]
})
export class AnnouncementsModule { }
