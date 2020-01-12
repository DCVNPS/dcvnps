import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  backUrl: string;
  public formError: string;
  public loginForm: FormGroup;

  constructor(private fromBuilder: FormBuilder,
    private api: ApiService,
    private auth: AuthService,
    private routeStat: ActivatedRoute,
    private router: Router) {
    this.routeStat.params.subscribe(async (params) => {
      this.backUrl = await params['backUrl'];
      // console.log(this.backUrl);
    });
  }

  ngOnInit() {
    this.buildForm();
    if (this.auth.isLogin()) {
      if (this.backUrl) {
        this.router.navigate([this.backUrl]);
      } else {
        this.router.navigate(['/home']);
      }
    }
  }

  buildForm() {
    this.loginForm = this.fromBuilder.group({
      email: this.fromBuilder.control(null, [Validators.required, Validators.email]),
      password: this.fromBuilder.control(null, [Validators.required, Validators.minLength(8)])
    })
  }
  get f() { return this.loginForm.controls; }

  get fromValues() { return this.loginForm.value; }

  onSubmit() {
    // console.log(this.fromValues);
    this.api.post('commons/authenticate', this.fromValues)
      .pipe(
        map((data: any) => data, error => error)
      ).subscribe((data) => {
        if (data.type === HttpEventType.Response) {
          console.log(data.headers);
        }
        this.auth.removeToken();
        this.auth.setToken({ token: data.token, role: data.role });
        if (this.backUrl) {
          this.router.navigate([this.backUrl]);
        } else {
          this.router.navigate(['/home']);
        }
      },
        (error) => {
          // console.log(error);
          this.formError = error.statusText;
        }
      );
  }
}
