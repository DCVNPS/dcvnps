import { Component, OnInit, NgModule, Input, Output, EventEmitter } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators, Form } from '@angular/forms';
import { User } from '../../models/user-model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  private user: User;
  public userForm: FormGroup;
  private email: FormControl;
  private lastName: FormControl;
  private firstName: FormControl;
  private password: FormControl;
  // private confirmPassword: FormControl;
  private userRole: FormControl;
  private formType:string;
  private roles: Object = {};
  @Input() config: Object = {};
  constructor() {
  }

  ngOnInit() {
    // console.log(this.config);
    this.formType = this.config['formType'] || 'new';
    this.roles = this.config['roles'] || null;
    // console.log(this.roles);
    if ( this.formType === 'edit'){
      this.user = this.config['user'];
    } else {
      this.user = new User(null, null, null, null, null,null,null,null,null);
    }
    this.createControls();
    this.createForm();
  }

  createForm() {
    this.userForm = new FormGroup({
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      // confirmPassword: this.confirmPassword,
      userRole: this.userRole 
    });
  }

  createControls() {
    this.firstName = new FormControl('', Validators.required);
    this.lastName = new FormControl('', Validators.required);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required, Validators.minLength(8)]);
    // this.confirmPassword = new FormControl('', [Validators.required, Validators.minLength(8)]);
    this.userRole = new FormControl('', Validators.required);
  }

  resetForm() {
    this.userForm.reset();
  }

  // convenience getter for easy access to form fields. Good for form validation.
  get f() { return this.userForm.controls; }

  // convenience getter for easy access to form values. Good for submit.
  get formValue() { return this.userForm.value;}

  createUser(){
    console.log(this.f);
    console.log(this.formValue);
  }

  // onUserRoleChanged(event){
  //   console.log(this.f);
  // }
}
