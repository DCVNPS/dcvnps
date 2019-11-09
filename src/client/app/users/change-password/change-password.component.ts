import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Form, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
public changePasswordForm: FormGroup;
public userName: FormControl;
public oldPassword: FormControl;
public newPassword: FormControl;
public confirmPassword: FormControl;
public misMatchPassword: boolean;
  constructor(private api: ApiService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.createForm();
    this.misMatchPassword = false;
  }

  createForm(){
    this.createControls();
    this.changePasswordForm = new FormGroup({
      userName: this.userName,
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      confirmPassword: this.confirmPassword
    });
  }
  createControls(){
    this.userName = new FormControl('', [Validators.required, Validators.email]);
    this.oldPassword = new FormControl('',  [Validators.required, Validators.minLength(8)]);
    this.newPassword = new FormControl('',  [Validators.required, Validators.minLength(8)]);
    this.confirmPassword = new FormControl('',  [Validators.required, Validators.minLength(8)]);
  }

  resetForm() {
    this.changePasswordForm.reset();
  }

  // convenience getter for easy access to form fields. Good for form validation.
  get f() { return this.changePasswordForm.controls; }

  // convenience getter for easy access to form values. Good for submit.
  get formValue() { return this.changePasswordForm.value;}
  
  onConfirmPasswordEnter(){
    this.misMatchPassword = this.formValue.newPassword !== this.formValue.confirmPassword;
  }
  onInputFocus(){
    this.misMatchPassword = this.formValue.newPassword !== this.formValue.confirmPassword;
  }
  onInputFocusOut(){
    this.misMatchPassword = this.formValue.newPassword !== this.formValue.confirmPassword;
  }
  changePassword(){
    const chgPwdObj = {
      userName: this.formValue.userName,
      oldPassword: this.formValue.oldPassword,
      newPassword: this.formValue.newPassword
    };
    // console.log(chgPwdObj);
    this.api.post('changepassword', chgPwdObj)
    .subscribe(
      result => { 
        console.log(result); 
        if ( result.success ){
          this.auth.logout();
          this.router.navigate(['/login']);
        }
      },
      error => { console.log(error); }
    )
  }
  cancelEdit(){}
}
