import { Injectable } from '@angular/core';
import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { ManageUserAddComponent } from '../user-add/user-add.component';
import { ManageUserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class UserAddGuard implements CanDeactivate<ManageUserAddComponent> {

  constructor( private userService: ManageUserService ) {}
  canDeactivate( component: ManageUserAddComponent ): boolean {
    if ( component.isDirty ) {
      const title = component.user ? this.userService.userFullName(component.user) || 'New User' : 'New User';
      return confirm(`Navigate away and lose all changes to ${title}?`);
    }
    return true;
  }

}
