import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { ApiService } from '../shared/api.service';
import { Router } from '@angular/router';
import { NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private api: ApiService,
              private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    if (this.auth.isLogin()) {
      this.router.navigate(['/contacts']);
    }
  }

  onSubmit(form: NgForm) {
    const values = form.value;
    const payload = {
      username: values.username,
      password: values.password
    };

    this.api.post('authenticate', payload)
    .subscribe(data => {
      this.auth.setToken(data.token);
      this.router.navigate(['/contacts']);
    });
  }
}
