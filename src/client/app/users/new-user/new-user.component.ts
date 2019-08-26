import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  private roles: Object = {};
  private userConfig: Object = {};
  constructor( private route: ActivatedRoute) { }

  ngOnInit() {
    this.roles = this.route.snapshot.data['roles'];
    this.userConfig = {formType: 'new', user: null, roles: this.roles};
    console.log(this.userConfig);
  }

}
