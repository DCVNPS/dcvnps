import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { AnnouncementEditComponent } from '../announcement-edit/announcement-edit.component';

@Injectable({
  providedIn: 'root'
})
export class AnnouncementEditGuard implements CanDeactivate<AnnouncementEditComponent> {
  canDeactivate( component: AnnouncementEditComponent ): boolean {
    if ( component.isDirty ){
      const title = component.announcement.title || 'New Announcement';
      return confirm(`Navigate away and lose all changes to ${title}?`);
    }
    return true;
  }

}
