import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Form, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
public changePasswordForm: FormGroup;
private userName: FormControl;
private oldPassword: FormControl;
private newPassword: FormControl;
private confirmPassword: FormControl;
public misMatchPassword: boolean;
  constructor() { }

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
 
  }
}
