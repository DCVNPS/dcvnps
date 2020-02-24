import { Component, OnInit, Input, Renderer, ViewChild, ElementRef } from '@angular/core';
import { User } from '../../models/user-model';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

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
  private totalItems: number;
  public Pages: Array<number> = [];
  @Input() users: Array<User>;
  @Input() roles: Array<any>;
  @Input() paginationConfig: PaginationConfig = {} as PaginationConfig;
  public showUsers: Array<User> = [];

  public userForm: FormGroup;
  public cnfrmPwdInvalid: boolean = false;
  public passwordInvalid: boolean = false;
  public passwordMatched: boolean = true;
  public user: User;

  @ViewChild('adduserdialog') addUserDialog: ElementRef;
  @ViewChild('deleteconfirmation') deleteUserDialog: ElementRef;
  @ViewChild('edituserdialog') editUserDialog: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private router: Router,
    private renderer: Renderer) {
    this.user = new User(null, null, null, null, null, null, null, null, null, null, null, null);
  }

  ngOnInit() {
    // console.log(this.users);
    this.initPage = this.paginationConfig.initPage || environment.initPage;
    this.itemPerPage = this.paginationConfig.itemPerPage || environment.itemPerPage;
    this.totalItems = this.users.length;
    for (let i = 0; i < Math.ceil(this.totalItems / this.itemPerPage); i++) {
      this.Pages.push(i + 1);
    }
    // Initially, we can push the first range of item
    // in the itemPerPage.
    for (let i = 0; i < this.itemPerPage && i < this.users.length; i++) {
      this.showUsers.push(this.users[i]);
    }
    this.buildForm();
  }

  onAddUser() {
    this.renderer.setElementClass(this.addUserDialog.nativeElement, 'active', true);
  }

  // base on https://netbasal.com/set-state-object-when-navigating-in-angular-7-2-b87c5b977bb
  // this.router.navigateByUrl('edituser', { state: user });
  onEditUser(user: User) {
    // console.log(this.roles);
    this.user = user;
    this.setFormValues(this.user);
    this.renderer.setElementClass(this.editUserDialog.nativeElement, 'active', true);
  }

  onDeleteUser(user: User) {
    // console.log(user.userId);
    this.user = user;
    this.renderer.setElementClass(this.deleteUserDialog.nativeElement, 'active', true);
  }

  nextPage() {
    if (this.initPage === this.Pages.length) {
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
    let index: number = 0;
    for (let i = 0; i < this.itemPerPage && i < this.users.length; i++) {
      index = (p - 1) * this.itemPerPage + i
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

  buildForm() {
    this.userForm = this.formBuilder.group({
      firstName: this.formBuilder.control(null, [Validators.required]),
      lastName: this.formBuilder.control(null, [Validators.required]),
      email: this.formBuilder.control(null, [Validators.required, Validators.email]),
      password: this.formBuilder.control(null),
      confirmPassword: this.formBuilder.control(null),
      activeInd: this.formBuilder.control(null, [Validators.required]),
      roleCode: this.formBuilder.control(null, [Validators.required])
    });
    // using reactive java script to capture changes.
    this.userForm.controls.confirmPassword.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
      .subscribe(data => {
        // reset password not matched notification.
        this.passwordMatched = true;
        if (data) {
          if (data.length < 8) {
            this.cnfrmPwdInvalid = true;
            // console.log('password must be minimum 8 characters.');
            if (this.formValue.password !== data) {
              this.passwordMatched = true;
            }
            else if(data.length === 0){
              this.passwordMatched = false;
            }
            else {
              this.passwordInvalid = false;
            }    
          }
          else if (data.length === 0) {
            this.cnfrmPwdInvalid = true;
          }
        }
        else {
          this.cnfrmPwdInvalid = false;
        }
      });

    this.userForm.controls.password.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged()
    )
      .subscribe(data => {
        // reset password not matched notification.
        this.passwordMatched = true;
        if (data) {
          if (data.length < 8) {
            this.passwordInvalid = true;
            // console.log('password must be minimum 8 characters.');
          }
          else if (data.length === 0) {
            this.passwordInvalid = true;
          }
          else {// data length > 8
            this.passwordInvalid = false;
          }
        }
        else {
          this.passwordInvalid = false;
        }
      });
  }

  setFormValues(user: User) {
    this.userForm.controls.firstName.setValue(user.userGivenName);
    this.userForm.controls.lastName.setValue(user.userSurname);
    this.userForm.controls.email.setValue(user.email);
    this.userForm.controls.roleCode.patchValue(user.roleCode);
    this.userForm.controls.activeInd.patchValue(user.activeInd);
  }

  resetForm() {
    this.userForm.reset();
  }

  // convenience getter for easy access to form fields. Good for form validation.
  get f() { return this.userForm.controls; }

  // convenience getter for easy access to form values. Good for submit.
  get formValue() { return this.userForm.value; }

  onNewUserAdded(event) {
    let newUser: User = event as User;
    console.log(newUser);
    const endPoint = "admin/user";
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.api.post(endPoint, newUser, headers)
      .subscribe(
        async result => {
          const user = await result[0];
          const aUser: User = new User(
            user.userId,
            user.email,
            user.password,
            user.userSurname,
            user.userGivenName,
            user.roleCode,
            user.roleDescription,
            user.activeInd,
            user.createdUserId,
            user.createdDate,
            user.updatedUserId,
            user.updatedDate
          );
          this.showUsers.unshift(aUser);
          this.users.unshift(aUser);
          this.resetForm();
          this.renderer.setElementClass(this.addUserDialog.nativeElement, 'active', false);
        }
        // ,        error => { console.error(error) }
      );
  }
  onCancelNewUser(event) {
    this.renderer.setElementClass(this.addUserDialog.nativeElement, 'active', false);
  }

  onUserEdited(){
    let apiUrl:string ='admin/user';
    const usersReplaceIndex = this.users.indexOf(this.user);
    const showReplaceIndex = this.showUsers.indexOf(this.user);
    this.user.activeInd = this.formValue.activeInd;
    this.user.roleCode = this.formValue.roleCode;
    this.user.userSurname = this.formValue.lastName;
    this.user.userGivenName = this.formValue.firstName;
    this.user.email = this.formValue.email;
    if( (this.formValue.password && this.formValue.confirmPassword) ){
      this.user.password = this.formValue.password;
      apiUrl ='admin/user/updatepassword';
    }
    this.api.put(apiUrl,this.user)
    .subscribe(
      data => {
        console.log(data); 
        this.resetForm();
        this.showUsers.splice(showReplaceIndex,1,this.user);
        this.users.splice(usersReplaceIndex,1, this.user);
      },
      error => { console.log(error); }
    )
    this.renderer.setElementClass(this.editUserDialog.nativeElement, 'active', false);
  }

  onCancelEditUser(){
    this.renderer.setElementClass(this.editUserDialog.nativeElement, 'active', false);
  }

  onAcceptDenyDelete(accept: boolean) {
    // close the modal
    this.renderer.setElementClass(this.deleteUserDialog.nativeElement, 'active', false);
    if (accept) {
      this.api.delete(`admin/user/${this.user.userId}`)
      .subscribe(
        () => {
          console.log(`user with id ${this.user.userId} has been deleted.`);
          let deleteIndex = this.showUsers.indexOf(this.user);
          this.showUsers.splice(deleteIndex, 1);
          deleteIndex = this.users.indexOf(this.user);
          this.users.splice(deleteIndex, 1);
        },
        () => { console.error(); }
      )
   }
  }

}
