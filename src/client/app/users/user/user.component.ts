import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { User } from '../../models/user-model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  private user: User;
  public userForm: FormGroup;
  // private userName: FormControl;
  // private lastName: FormControl;
  // private firstName: FormControl;
  // private password: FormControl;
  // private confirmPassword: FormControl;
  // private roleCode: FormControl;
  public formType:string;
  private roles: Object = {};
  @Input() config: Object = {};
  @Output() newUserCreated: EventEmitter <User> = new EventEmitter<User>();
  @Output() userUpdated: EventEmitter <User> = new EventEmitter<User>();
  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.roles = this.config['roles'] || null;
    this.user = this.config['user'] || null;
    this.formType = this.config['formType'] ||  'newUser';
    this.buildForm();
    console.log(this.f);
  }

  buildForm(){
    this.userForm = this.formBuilder.group({
      firstName: this.formBuilder.control(null, [Validators.required]),
      lastName: this.formBuilder.control(null,[Validators.required]),
      email: this.formBuilder.control(null, [Validators.required, Validators.email]),
      password: this.formBuilder.control(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: this.formBuilder.control(null, [Validators.required, Validators.minLength(8)]),
      roleCode: this.formBuilder.control(null, [Validators.required])
    })
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
