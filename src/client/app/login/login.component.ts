import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpEventType } from '@angular/common/http';

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
    // private api: ApiService,
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

  onEnterKey(){
    if(this.loginForm.valid){
      this.onSubmit();
    }
  }
  onSubmit() {
    // console.log(this.fromValues);
    this.auth.login(this.fromValues)
    .subscribe( success =>{
      if(success){
        if(this.backUrl){
          this.router.navigateByUrl(this.backUrl);
        }
        else{
          this.router.navigateByUrl('/home');
        }
      }
    });
  }
}
