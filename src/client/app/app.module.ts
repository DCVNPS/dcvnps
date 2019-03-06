import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactComponent } from './contact/contact.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ApiService } from './shared/api.service';
import { AuthService } from './shared/auth.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { CarouselComponent } from './carousel/carousel.component';
import { HomeComponent } from './home/home.component';
import { SlideComponent } from './slide/slide.component';
import { FooterComponent } from './footer/footer.component';
import { CarouselsaveComponent } from './carouselsave/carouselsave.component';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ContactListComponent,
    ContactComponent,
    AddContactComponent,
    LoginComponent,
    CarouselComponent,
    HomeComponent,
    SlideComponent,
    FooterComponent,
    CarouselsaveComponent,
    CarouselItemComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ApiService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
