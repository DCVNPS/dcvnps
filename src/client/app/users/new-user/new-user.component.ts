import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user-model';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  private roles: Object = {};
  private user : User;
  private userConfig: Object = {};
  constructor( private route: ActivatedRoute) { }

  ngOnInit() {
    this.roles = this.route.snapshot.data['roles'];
    this.user = new User(null, null, null, null, null, null,null,null,null,null);
    this.userConfig = {user: this.user, roles: this.roles};
    // console.log(this.userConfig);
  }

}
