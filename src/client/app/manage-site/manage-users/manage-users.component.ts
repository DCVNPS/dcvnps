import { Component, OnInit, Input, AfterViewInit, AfterContentChecked, AfterContentInit, AfterViewChecked } from '@angular/core';
import { User } from '../../models/user-model';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';

export interface paginationConfig {
  initPage: number,
  itemPerPage: number,
  totalItem: number
}

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.scss']
})
export class ManageUsersComponent implements OnInit {
  public initPage: number = 1;
  private itemPerPage: number = 2;
  private totalItems: number ;
  public Pages: Array<number> =[];
  @Input() users: Array<User>;
  public showUsers: Array<User> = [];

  constructor(
    private api: ApiService,
    private router: Router) {
  }

  ngOnInit(){
    // console.log(this.users);
    this.totalItems = this.users.length;
    for(let i = 0; i < Math.ceil(this.totalItems/this.itemPerPage); i++){
      this.Pages.push(i+1);
    }
    // Initially, we can push the first range of item
    // in the itemPerPage.
    for(let i = 0; i < this.itemPerPage && i < this.users.length ; i++){
      this.showUsers.push(this.users[i]);
    }
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

  nextPage(){
    if(this.initPage === this.Pages.length){
      return;
    }
    // console.log(this.initPage);
    this.showUsers = [];
    for(let i = 0; i < this.itemPerPage && i < this.users.length; i++){
      this.showUsers.push(this.users[this.initPage*this.itemPerPage+i]);
    }
    this.initPage+=1;
    // console.log(this.showUsers);
  }

  showPage(p:number){
    this.initPage = p;
    this.showUsers = [];
    let index:number = 0;
    for(let i = 0; i < this.itemPerPage && i < this.users.length; i++){
      index = (p-1)*this.itemPerPage+i
      this.showUsers.push(this.users[index]);
    }
  }

  previousPage(){
    let index = 0;
    if(this.initPage === 1){
      return;
    }
    this.initPage-=1;
    // console.log(this.initPage);
    this.showUsers = [];
    for(let i = 0; i < this.itemPerPage && i < this.users.length; i++){
      index = (this.initPage-1)*this.itemPerPage+i;
      this.showUsers.push(this.users[index]);
    }
    // console.log(this.showUsers);
  }
}
