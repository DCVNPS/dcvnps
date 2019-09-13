import { Component, OnInit, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { User } from '../../models/user-model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  private user: User;
  public userForm: FormGroup;
  private userName: FormControl;
  private lastName: FormControl;
  private firstName: FormControl;
  private password: FormControl;
  // private confirmPassword: FormControl;
  private roleCode: FormControl;
  private formType:string;
  private roles: Object = {};
  @Input() config: Object = {};
  @Output() newUserCreated: EventEmitter <User> = new EventEmitter<User>();
  @Output() userUpdated: EventEmitter <User> = new EventEmitter<User>();
  constructor() {
  }

  ngOnInit() {
    // console.log(this.config);
    this.roles = this.config['roles'] || null;
    // console.log(this.roles);
    this.user = this.config['user'] || null;
    this.formType = this.config['formType'] ||  'newUser';
    console.log(this.formType);
    this.createControls();
    this.createForm();
  }

  createForm() {
    this.userForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      userName: this.userName,
      password: this.password,
      // confirmPassword: this.confirmPassword,
      roleCode: this.roleCode 
    });
  }

  createControls() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.userName = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(8)]);
    // this.confirmPassword = new FormControl('', [Validators.required, Validators.minLength(8)]);
    this.roleCode = new FormControl('', Validators.required);
  }

  resetForm() {
    this.userForm.reset();
  }

  // convenience getter for easy access to form fields. Good for form validation.
  get f() { return this.userForm.controls; }

  // convenience getter for easy access to form values. Good for submit.
  get formValue() { return this.userForm.value;}

  createUser(){
    // console.log(this.f);
    // console.log(this.formValue);
    this.user = new User(null, this.formValue.userName,  this.formValue.password, this.formValue.lastName, this.formValue.firstName, this.formValue.roleCode, null, null, null, null);
    this.user.createdDate = new Date();
    this.user.updatedDate = new Date();
    console.log(this.user);
    this.newUserCreated.emit(this.user);
  }

  cancelEdit(){
    console.log(`Cancel Edit user  ${this.user.fulName}`);
  }

  updateUser(){
    console.log(`Cancel Edit user  ${this.user.fulName}`);
  }

}
