import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { ClassAddComponent } from '../class-add/class-add.component';

@Injectable({
  providedIn: 'root'
})
export class ManageClassAddGuard implements CanDeactivate<ClassAddComponent> {
  canDeactivate( component: ClassAddComponent ): boolean {
    if ( component.isDirty ) {
      const title = component.vnpsClass ? component.vnpsClass.classLevelDesc || 'New Class' : 'New Class';
      return confirm(`Navigate away and lose all changes to ${title}?`);
    }
    return true;
  }
}
