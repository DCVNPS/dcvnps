import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Headers} from '@angular/http';
import { User } from '../../models/user-model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  private roles: Object = {};
  private user: User;
  public userConfig: Object = {};
  constructor(private api: ApiService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.roles = this.route.snapshot.data['roles'];
    this.user = new User(null, null, null, null, null, null, null, null, null, null);
    this.userConfig = { user: this.user, roles: this.roles, formType: 'newUser' };
    console.log(this.userConfig);
  }

  onNewUserCreated(user: User) {
    console.log(user);
    const endPoint = "admin/user";
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    this.api.post(endPoint, user, headers)
      .subscribe(
        result => { console.log(result); },
        error => { console.error(error) }
      );
  }
}
