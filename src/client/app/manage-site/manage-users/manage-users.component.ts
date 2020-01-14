import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../models/user-model';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {

@Input() users: Array<User>;
  public Users: Array<User> = [];

  constructor(
    private api: ApiService,
    private router: Router) { }

  ngOnInit() {
    this.Users = this.users;
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
        () => { console.log(`user with id ${userid} has been deleted.`) },
        () => { console.error(); }
      )
  }
}
