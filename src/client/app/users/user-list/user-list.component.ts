import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user-model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public users: Array<User> = [];
  
  constructor(private api: ApiService) { }

  ngOnInit() {
  }

  getUsers(){
    
  }
}
