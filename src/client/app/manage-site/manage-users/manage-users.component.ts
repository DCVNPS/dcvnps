import { Component, OnInit, Input, Renderer, ViewChild, ElementRef } from '@angular/core';
import { User } from '../../models/user-model';
import { ApiService } from '../../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

export interface PaginationConfig {
  initPage: number,
  itemPerPage: number
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
  @Input() roles:Array<any>;
  @Input() paginationConfig: PaginationConfig = {} as PaginationConfig;
  public showUsers: Array<User> = [];

  public userForm: FormGroup;
  private user: User;

  @ViewChild('adduserdialog') addUserDialog: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private route: ActivatedRoute,
    private renderer: Renderer) {
      this.user = new User(null, null, null, null, null, null, null, null, null, null, null, null);
  }

  ngOnInit(){
    // console.log(this.users);
    this.initPage = this.paginationConfig.initPage || environment.initPage;
    this.itemPerPage = this.paginationConfig.itemPerPage || environment.itemPerPage;
    this.totalItems = this.users.length;
    for(let i = 0; i < Math.ceil(this.totalItems/this.itemPerPage); i++){
      this.Pages.push(i+1);
    }
    // Initially, we can push the first range of item
    // in the itemPerPage.
    for(let i = 0; i < this.itemPerPage && i < this.users.length ; i++){
      this.showUsers.push(this.users[i]);
    }
    this.roles = this.route.snapshot.data['roles'];
    this.buildForm();
  }

  onAddUser() {
    // this.router.navigateByUrl('newuser');
    this.renderer.setElementClass(this.addUserDialog.nativeElement, 'active', true);
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

  // Add user Form
  buildForm(){
    this.userForm = this.formBuilder.group({
      firstName: this.formBuilder.control(null, [Validators.required]),
      lastName: this.formBuilder.control(null,[Validators.required]),
      email: this.formBuilder.control(null, [Validators.required, Validators.email]),
      password: this.formBuilder.control(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: this.formBuilder.control(null, [Validators.required, Validators.minLength(8)]),
      roleCode: this.formBuilder.control(null, [Validators.required]),
      activeInd: this.formBuilder.control('N',[Validators.required])
    })
  }

  resetForm() {
    this.userForm.reset();
  }

  // convenience getter for easy access to form fields. Good for form validation.
  get f() { return this.userForm.controls; }

  // convenience getter for easy access to form values. Good for submit.
  get formValue() { return this.userForm.value;}

  onSubmitForm(){
    this.user.userSurname = this.formValue.lastName;
    this.user.userGivenName = this.formValue.firstName;
    this.user.email = this.formValue.email;
    this.user.password = this.formValue.password;
    this.user.roleCode = this.formValue.roleCode;
    this.user.activeInd = this.formValue.activeInd;
    // console.log(this.user);
    const endPoint = "admin/user";
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.api.post(endPoint, this.user, headers)
      .subscribe(
        result => { 
          // console.log(result); 
          this.showUsers.push(result);
          this.resetForm();
          this.renderer.setElementClass(this.addUserDialog.nativeElement, 'active', false);
        },
        error => { console.error(error) }
      );
  }
  
  onCancelNewUser(){
    this.resetForm();
    this.renderer.setElementClass(this.addUserDialog.nativeElement, 'active', false);
  }
}
