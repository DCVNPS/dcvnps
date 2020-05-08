import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'vnps-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formError: string;
  public loginForm: FormGroup;

  constructor(private fromBuilder: FormBuilder,
              private authService: AuthService,
              private router: Router) {  }

  ngOnInit(): void {
    this.buildForm();
  }
  buildForm() {
    this.loginForm = this.fromBuilder.group({
      email: this.fromBuilder.control(null, [Validators.required, Validators.email]),
      password: this.fromBuilder.control(null, [Validators.required, Validators.minLength(8)])
    });
  }
  get f() { return this.loginForm.controls; }

  get fromValues() { return this.loginForm.value; }

  onEnterKey() {
    if (this.loginForm.valid) {
      this.onSubmit();
    }
  }
  onSubmit() {
    // console.log(this.fromValues);
    this.authService.login(this.fromValues)
      .subscribe(() => {
        if (this.authService.isLoggedIn) {
          this.router.navigateByUrl(this.authService.redirectUrl);
        }
      });
  }

  onCancel() {
    this.router.navigateByUrl('/home');
  }
}
