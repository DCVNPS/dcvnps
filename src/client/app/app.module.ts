import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
import { FooterComponent } from './footer/footer.component';
import { CarouselItemComponent } from './carousel-item/carousel-item.component';
import { ElementDimensionsDirective } from './directives/element-dimensions.directive'
import { ImageRolloverDirective } from './directives/image-rollover.directive';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { GalleriesComponent } from './galleries/galleries.component';
import { ProgramsComponent } from './programs/programs.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { QuickTestComponent } from './quick-test/quick-test.component';
import { PopupComponent } from './popup/popup.component';
import { PopupService } from './services/popup.service';

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
    FooterComponent,
    CarouselItemComponent,
    ElementDimensionsDirective,
    ImageRolloverDirective,
    SiteHeaderComponent,
    GalleriesComponent,
    ProgramsComponent,
    AnnouncementsComponent,
    AboutusComponent,
    QuickTestComponent,
    PopupComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    ApiService,
    AuthService,
    AuthGuard,
    PopupService],
  bootstrap: [AppComponent],
  entryComponents: [PopupComponent]
})
export class AppModule { }
