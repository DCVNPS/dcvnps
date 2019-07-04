import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ContactComponent } from './contact/contact.component';
import { AddContactComponent } from './add-contact/add-contact.component';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ElementDimensionsDirective } from './directives/element-dimensions.directive'
import { ImageRolloverDirective } from './directives/image-rollover.directive';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { GalleriesComponent } from './galleries/galleries.component';
import { ProgramsComponent } from './programs/programs.component';
import { AnnouncementsComponent } from './announcements/announcements.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { QuickTestComponent } from './quick-test/quick-test.component';
import { DomService } from './services/dom.service';
import { ModalService } from './services/modal.service';
import { GalleryComponent } from './gallery/gallery.component';
import { PopupComponent } from './popup/popup.component';
import { RouterLinkActive } from '@angular/router';
import { SortDescPipe } from './pipes/sort.desc.pipe';
import { DropzoneComponent } from './dropzone/dropzone.component';
import { DndDirective } from './dropzone/dnd.directive';
import { HvncarouselComponent } from './hvncarousel/hvncarousel.component';
import { MatchHeightDirective } from './directives/matchheight.directive';
import { CardImageSizeDirective } from './directives/card-image-size.directive';
import { SlideImageSizeDirective } from './directives/slide-image-size.directive';
import { NonGalleryPhotosResolve } from './resolvers/nongallery-photos-resolve';
import { GalleriesResolve } from './resolvers/galleries-resolve';
import { GalleryPhotosResolve } from './resolvers/gallery-photos-resolve';
import { EditGalleryComponent } from './edit-gallery/edit-gallery.component';
import { HvnHoverDirective } from './directives/hvn-hover.directive';
import { GalleryListComponent } from './gallery-list/gallery-list.component';
import { AuthorPhotoComponent } from './author-photo/author-photo.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ContactListComponent,
    ContactComponent,
    AddContactComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    ElementDimensionsDirective,
    ImageRolloverDirective,
    SiteHeaderComponent,
    GalleriesComponent,
    ProgramsComponent,
    AnnouncementsComponent,
    AboutusComponent,
    QuickTestComponent,
    GalleryComponent,
    PopupComponent,
    SortDescPipe,
    DropzoneComponent,
    DndDirective,
    HvncarouselComponent,
    MatchHeightDirective,
    CardImageSizeDirective,
    SlideImageSizeDirective,
    EditGalleryComponent,
    HvnHoverDirective,
    GalleryListComponent,
    AuthorPhotoComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    RouterLinkActive,
    ApiService,
    AuthService,
    AuthGuard,
    DomService,
    ModalService,
    GalleryPhotosResolve,
    NonGalleryPhotosResolve,
    GalleriesResolve
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
