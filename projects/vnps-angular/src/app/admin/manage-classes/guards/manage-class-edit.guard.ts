import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { ClassEditComponent } from '../class-edit/class-edit.component';

@Injectable({
  providedIn: 'root'
})
export class ManageClassEditGuard implements CanDeactivate<ClassEditComponent> {
  canDeactivate( component: ClassEditComponent ): boolean {
    if ( component.isDirty ) {
      const title = component.vnpsClass.classLevelDesc || 'New Class';
      return confirm(`Navigate away and lose all changes to ${title}?`);
    }
    return true;
  }
}
