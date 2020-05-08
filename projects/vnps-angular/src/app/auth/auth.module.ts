import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';
import {AuthInterceptorProviders } from './interceptors';
import { ApiModule } from '../api/api.module';
import { AuthRoutingModule } from './auth.routing.module';
import { ChangePasswordComponent } from './change-password/change-password.component';



@NgModule({
  declarations: [
    LoginComponent,
    ChangePasswordComponent
  ],
  providers: [
    AuthGuard,
    AuthService,
    AuthInterceptorProviders
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ApiModule,
    AuthRoutingModule
  ],
  exports: [
  ]
})
export class AuthModule { }
