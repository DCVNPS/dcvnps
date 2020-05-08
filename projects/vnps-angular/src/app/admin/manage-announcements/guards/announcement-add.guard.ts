import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { AnnouncementAddComponent } from '../announcement-add/announcement-add.component';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementAddGuard implements CanDeactivate<AnnouncementAddComponent> {
  canDeactivate( component: AnnouncementAddComponent ): boolean {
    if ( component.isDirty ) {
      const title = component.announcement.title || 'New Announcement';
      return confirm(`Navigate away and lose all changes to ${title}?`);
    }
    return true;
  }

}
