import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user-model';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

  public adminUsers: Array<User> = [];

  constructor(
    private api: ApiService,
    private router: Router) { }

  ngOnInit() {
    this.getAdminUsers();
  }
  getAdminUsers() {
    this.api.get('admin/user/adminusers')
      .subscribe(
        data => {
          data.forEach(au => {
            const aUser: User = new User(
              au.userId,
              au.email,
              au.password,
              au.userSurname,
              au.userGivenName,
              au.roleCode,
              au.roleDescription,
              au.activeInd,
              au.createdUserId,
              au.createdDate,
              au.updatedUserId,
              au.updatedDate
            );
            this.adminUsers.push(aUser);
          })
          // console.log(this.adminUsers);
        },
        error => { console.log(error); }
      );
  }

  onAddUser() {
    this.router.navigateByUrl('newuser');
  }

  // base on https://netbasal.com/set-state-object-when-navigating-in-angular-7-2-b87c5b977bb
  onEditUser(user: User) {
    // console.log(user);
    this.router.navigateByUrl('edituser', { state: user });
  }

  onDeleteUser(userid: string) {
    console.log(userid);
    this.api.delete(`admin/user/${userid}`)
      .subscribe(
        success => { console.log(`user with id ${userid} has been deleted.`) },
        error => { console.error(); }
      )
  }
}
