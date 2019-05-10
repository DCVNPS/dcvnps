import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { ApiService } from '../shared/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  backUrl: string;
  constructor(private api: ApiService,
              private auth: AuthService,
              private routeStat : ActivatedRoute,
              private router: Router) {
    this.routeStat.params.subscribe(async (params) =>{
      this.backUrl = await params['backUrl'];
      console.log(this.backUrl);
    });
}

  ngOnInit() {
    if (this.auth.isLogin()) {
      if(this.backUrl){
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
    .subscribe(async (data) => {
      this.auth.setToken(data.token);
      if(this.backUrl){
        this.router.navigate([this.backUrl]);
      } else {
        this.router.navigate(['/home']);
      }
    });
  }
}
