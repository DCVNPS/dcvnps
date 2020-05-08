import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VnpsMenuComponent } from './vnps-menu/vnps-menu.component';
import { AuthModule } from '../auth/auth.module';
import { ApiModule } from '../api/api.module';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [VnpsMenuComponent],
  providers: [],
  imports: [
    AppRoutingModule,
    CommonModule,
    AuthModule,
    ApiModule
  ],
  exports: [VnpsMenuComponent]
})
export class MenuModule { }
