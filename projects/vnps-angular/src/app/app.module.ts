import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Appplication imports
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuModule } from './menu/menu.module';
import { MessageComponent } from './messages/message/message.component';
import { SharedModule } from './shared/shared.module';
import { HomeModule } from './home/home.module';
import { ClassesModule } from './classes/classes.module';
import { ShellComponent } from './shell/shell.component';

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    ShellComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MenuModule,
    SharedModule,
    HomeModule,
    ClassesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
    // Diagnostic only: inspect router configuration
    // constructor(router: Router) {
    //   // Use a custom replacer to display function names in the route configs
    //   const replacer = (key: any, value: { name: any; }) => (typeof value === 'function') ? value.name : value;
    //   console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
    // }
 }
