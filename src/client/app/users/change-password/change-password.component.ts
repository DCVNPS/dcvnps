import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
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
  public misMatchPassword: boolean;
  constructor(private formBuilder: FormBuilder, private api: ApiService, private auth: AuthService, private router: Router) { }

  ngOnInit() {
    this.buildForm();
    this.misMatchPassword = false;
  }

  buildForm() {
    this.changePasswordForm = this.formBuilder.group({
      email: this.formBuilder.control(null, [Validators.required, Validators.email]),
      oldPassword: this.formBuilder.control(null, [Validators.required, Validators.minLength(8)]),
      newPassword: this.formBuilder.control(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: this.formBuilder.control(null, [Validators.required, Validators.minLength(8)])
    });
  }

  resetForm() {
    this.changePasswordForm.reset();
  }

  // convenience getter for easy access to form fields. Good for form validation.
  get f() { return this.changePasswordForm.controls; }

  // convenience getter for easy access to form values. Good for submit.
  get formValue() { return this.changePasswordForm.value; }

  onConfirmPasswordEnter() {
    this.misMatchPassword = this.formValue.newPassword !== this.formValue.confirmPassword;
  }
  onInputFocus() {
    this.misMatchPassword = this.formValue.newPassword !== this.formValue.confirmPassword;
  }
  onInputFocusOut() {
    this.misMatchPassword = this.formValue.newPassword !== this.formValue.confirmPassword;
  }
  changePassword() {
    const chgPwdObj = {
      email: this.formValue.email,
      oldPassword: this.formValue.oldPassword,
      newPassword: this.formValue.newPassword
    };
    // console.log(chgPwdObj);
    this.api.post('changepassword', chgPwdObj)
      .subscribe(
        result => {
          console.log(result); 
            this.auth.logout();
            this.router.navigate(['/login']);
        }
        // ,        error => { console.log(error); }
      )
  }
  cancelEdit() { }
}
