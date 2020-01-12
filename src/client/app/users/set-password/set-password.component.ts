import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { User } from '../../models/user-model';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.scss']
})
export class SetPasswordComponent implements OnInit {
  public setPasswordForm: FormGroup;
  public user: User = null;
  public hideSearch:boolean = false;
  public searchText: string;
  public errorMessage: string = undefined;
  public successMessage: string = undefined;
  constructor(private formBuilder: FormBuilder, private api: ApiService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.setPasswordForm = this.formBuilder.group({
      email: this.formBuilder.control(null, [Validators.required, Validators.email]),
      password: this.formBuilder.control(null, [Validators.required, Validators.minLength(8)])
    })
  }

  get f() { return this.setPasswordForm.controls; }

  get formValue() { return this.setPasswordForm.value; }

  searchUer() {
    const apiEndpoint = `/admin/user/byemail/${this.searchText}`;
    this.api.get(apiEndpoint).subscribe(async data => {
      this.user = await data[0];
      if(this.user){
        this.hideSearch = true;
        this.errorMessage = undefined;
        this.successMessage = undefined;
        this.f.email.patchValue(this.user.email);  
      }
      else{
        this.hideSearch = false;
        this.errorMessage = 'Email/ User not found.';
        this.successMessage = undefined;
      }
    }, error =>{
      this.hideSearch = false;
      this.errorMessage = error.message;
      this.successMessage = undefined;
    });
  }

  onSetPassword() {
    this.user.password = this.formValue.password;
    this.hideSearch = false;
    // call API to update the password.
    this.api.put('admin/user/setpassword',this.user)
    .subscribe( data =>{
      this.successMessage = `Successfully set password for user: ${this.user.email}`;
      this.hideSearch = false;
      this.user = undefined; 
      this.errorMessage = undefined;
    },
    error =>{
      console.log(error);
      this.hideSearch = false;
      this.successMessage = undefined;
      this.errorMessage = `update user's password failed -- ${error.message}`;
    });
  }

  onResetForm() {
    this.user = null;
    this.hideSearch = false;
    this.setPasswordForm.reset();
  }

  resetMessages(){
    this.errorMessage = undefined;
    this.successMessage = undefined;
  }
}
