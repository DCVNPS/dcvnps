import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Headers} from '@angular/http';
import { User } from '../../models/user-model';
import { ApiService } from '../../services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {
public userForm: FormGroup;
  public roles: Object = {};
  private user: User;
  constructor(private formBuilder: FormBuilder, private api: ApiService, private route: ActivatedRoute) { 
    this.user = new User(null, null, null, null, null, null, null, null, null, null);
  }

  ngOnInit() {
    this.roles = this.route.snapshot.data['roles'];
    // this.userConfig = { user: this.user, roles: this.roles, formType: 'newUser' };
    // console.log(this.userConfig);
    this.buildForm();
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

  onNewUserCreated(user: User) {
    console.log(user);
    const endPoint = "admin/user";
    // const headers = new Headers();
    // headers.append('Content-Type', 'application/json');
    let headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.api.post(endPoint, user, headers)
      .subscribe(
        result => { console.log(result); },
        error => { console.error(error) }
      );
  }
  onSubmitForm(){

  }
}
