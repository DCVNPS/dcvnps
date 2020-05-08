import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ManageUserEditComponent } from '../user-edit/user-edit.component';
import { ManageUserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class UserEditGuard implements CanDeactivate<ManageUserEditComponent> {
  constructor( private userService: ManageUserService ) {}
  canDeactivate( component: ManageUserEditComponent ): boolean {
    if ( component.isDirty ) {
      const title = component.user ? this.userService.userFullName(component.user) || 'New User' : 'New User';
      return confirm(`Navigate away and lose all changes to ${title}?`);
    }
    return true;
  }
}
