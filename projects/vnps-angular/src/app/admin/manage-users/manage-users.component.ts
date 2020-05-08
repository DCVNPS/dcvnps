import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/interfaces';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api/services/api.service';
import { ManageUserService } from './user.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'vnps-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {

  users: Array<User> = [];
  forDelUser: User;
  showUsers: Array<User> = [];
  userTotal: number;
  initPage: number;
  itemPerPage: number;
  pages: Array<number> = [];
  showDialog = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private auth: AuthService,
    public userService: ManageUserService
  ) {
  }

  ngOnInit(): void {
    this.initPage = environment.initPage || 1;
    this.itemPerPage = environment.itemPerPage || 25;
    this.initializeData();
  }

  get siteAdmin(): boolean {
    return this.auth.siteAdmin;
  }

  initializeData(): void {
    // retrieve data from route resolver
    this.users = this.route.snapshot.data.users;
    // console.log(this.users);
    this.forDelUser = this.users[0];
    this.userTotal = this.users.length;
    this.setUpPagination();
  }

  setUpPagination() {
    // populate the pages array.
    for (let i = 0; i < Math.ceil(this.userTotal / this.itemPerPage); i++) {
      this.pages.push(i + 1);
    }
    // configure the first range of users to display
    for (let i = 0; i < this.itemPerPage && i < this.userTotal; i++) {
      this.showUsers.push(this.users[i]);
    }
  }

  onDeleteUser(id: string) {
    this.forDelUser = this.users.filter(u => u.userId === id)[0];
    this.showDialog = true;
  }

  onAcceptDenyDelete(accept: boolean) {
    this.showDialog = false;
    if (accept) {
      alert(`User ${this.userService.userFullName(this.forDelUser)} deleted`);
      this.api.delete(`users/${this.forDelUser.userId}`)
        .subscribe((failed) => {
          if (!!failed) {
            alert(`User ${this.userService.userFullName(this.forDelUser)} deleted.`);
            const delIndex = this.users.indexOf(this.forDelUser);
            this.users.splice(delIndex, 1);
            // re-initialize pagination after deleting.
            this.setUpPagination();
          }
        });
    }
  }

  nextPage() {
    if (this.initPage === this.pages.length) {
      return;
    }
    // console.log(this.initPage);
    this.showUsers = [];
    for (let i = 0; i < this.itemPerPage && i < this.users.length; i++) {
      this.showUsers.push(this.users[this.initPage * this.itemPerPage + i]);
    }
    this.initPage += 1;
  }

  showPage(p: number) {
    this.initPage = p;
    this.showUsers = [];
    let index = 0;
    for (let i = 0; i < this.itemPerPage && i < this.users.length; i++) {
      index = (p - 1) * this.itemPerPage + i;
      this.showUsers.push(this.users[index]);
    }
  }

  previousPage() {
    let index = 0;
    if (this.initPage === 1) {
      return;
    }
    this.initPage -= 1;
    // console.log(this.initPage);
    this.showUsers = [];
    for (let i = 0; i < this.itemPerPage && i < this.users.length; i++) {
      index = (this.initPage - 1) * this.itemPerPage + i;
      this.showUsers.push(this.users[index]);
    }
  }

}
