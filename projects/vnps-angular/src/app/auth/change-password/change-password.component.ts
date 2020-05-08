import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../../api/services/api.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IChangePassword } from '../models/change-password';
import { LoggedInUser } from '../models/loginuser';

@Component({
  selector: 'vnps-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public changePasswordForm: FormGroup;
  public misMatchPassword: boolean;
  loggedInUser: LoggedInUser;
  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.loggedInUser = this.authService.User;
    this.buildForm();
    this.misMatchPassword = false;
  }

  buildForm() {
    this.changePasswordForm = this.formBuilder.group({
      email: this.formBuilder.control(this.loggedInUser.email, [Validators.required, Validators.email]),
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
  // changePassword() {
  //   const chgPwdObj = {
  //     email: this.formValue.email,
  //     oldPassword: this.formValue.oldPassword,
  //     newPassword: this.formValue.newPassword
  //   };
  //   // console.log(chgPwdObj);
  //   this.api.post('changepassword', chgPwdObj)
  //     .subscribe(
  //       (result: any) => {
  //         console.log(result);
  //         this.authService.logout();
  //         this.router.navigate(['/login']);
  //       }
  //     );
  // }
  onSubmit(): void {
    const credential: IChangePassword = {
      email: this.formValue.email,
      oldPasswrod: this.formValue.oldPassword,
      newPassword: this.formValue.newPassword
    };
    this.authService.changePassword(credential)
    .subscribe( () => {
      this.authService.logout().subscribe(success => {
        if (success) {
          const redirectUrl = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';
          this.router.navigate([redirectUrl]);
        }
      });
    });
  }
  onCancel(): void {
    this.changePasswordForm.reset();
    const redirectUrl = this.authService.redirectUrl ? this.authService.redirectUrl : '/home';
    this.router.navigate([redirectUrl]);
  }
}
