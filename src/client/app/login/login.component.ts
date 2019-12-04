import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  backUrl: string;
  formError: string;
  
  constructor(private api: ApiService,
    private auth: AuthService,
    private routeStat: ActivatedRoute,
    private router: Router) {
    this.routeStat.params.subscribe(async (params) => {
      this.backUrl = await params['backUrl'];
      // console.log(this.backUrl);
    });
  }

  ngOnInit() {
    if (this.auth.isLogin()) {
      if (this.backUrl) {
        this.router.navigate([this.backUrl]);
      } else {
        this.router.navigate(['/home']);
      }
    }
  }

  onSubmit(form: NgForm) {
    const values = form.value;
    const payload = {
      username: values.username,
      password: values.password
    };

    this.api.post('authenticate', payload)
      .subscribe((data) => {
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
  onKeydown(event) {
    // for now. Should you reactive form and subscribe and take only 1.
    this.formError = undefined;
  }

}
