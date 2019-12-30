import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user-model';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {
public searchForm: FormGroup;
public setPasswordForm: FormGroup;
public user: User;
  constructor(private formBuilder: FormBuilder, private api: ApiService) { }

  ngOnInit() {
    this.buildSearchFrom();
    this.buildSetPasswordForm();
  }

  buildSearchFrom(){
    this.searchForm = this.formBuilder.group({
      email: this.formBuilder.control(null, [Validators.required, Validators.email])
    })
  }

  buildSetPasswordForm(){
    this.setPasswordForm = this.formBuilder.group({
      email: this.formBuilder.control(null,[Validators.required, Validators.email]),
      password: this.formBuilder.control(null, [Validators.required, Validators.minLength(8)])
    })
  }
  get sf(){ return this.searchForm.controls;}

  get sfFormValue(){ return this.searchForm.value;}

  get f(){ return this.setPasswordForm.controls;}
  
  get fromValue(){ return this.setPasswordForm.value;}

  searchUer(){
    console.log(`Search Click! /admin/user/byemail/${this.sfFormValue.email}`);
    const apiEndpoint = `/admin/user/byemail/${this.sfFormValue.email}`;
    this.api.get(apiEndpoint).subscribe( async (data)  => { 
      this.user = await data[0]; 
      // console.log(this.user);
      this.f.email.patchValue(this.user.email);      
     });
  }
}
