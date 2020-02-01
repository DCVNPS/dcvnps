import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { MenuComponent } from './menu/menu.component';
import { ApiService } from './services/api.service';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { ElementDimensionsDirective } from './directives/element-dimensions.directive'
import { ImageRolloverDirective } from './directives/image-rollover.directive';
import { SiteHeaderComponent } from './site-header/site-header.component';
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
import { GalleriesResolve } from './resolvers/galleries-resolve';
import { GalleryPhotosResolve } from './resolvers/gallery-photos-resolve';
import { EditPersonalGalleryComponent } from './gallery/edit-personal-gallery/edit-personal-gallery.component';
import { HvnHoverDirective } from './directives/hvn-hover.directive';
import { AuthorPhotoComponent } from './gallery/author-photo/author-photo.component';
import { PaypalButtonComponent } from './paypal-button/paypal-button.component';
import { ManageSiteComponent } from './manage-site/manage-site.component';
import { PrettyPrintPipe } from './pipes/pretty-print.pipe';
import { ManageGalleriesComponent } from './manage-site/manage-galleries/manage-galleries.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { AddAnnounceComponent } from './announcements/add-announcement/add-announce.component';
import { AnnouncementComponent } from './announcements/announcement/announcement.component';
import { EditAnnouncementComponent } from './announcements/edit-announcement/edit-announcement.component';
import { NewUserComponent } from './users/new-user/new-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ChangePasswordComponent } from './users/change-password/change-password.component';
import { EditClassComponent } from './edit-class/edit-class.component';
import { VnpsClassesComponent } from './vnps-classes/vnps-classes.component';
import { CampingRegistrationComponent } from './registrations/camping-registration/camping-registration.component';
import { ClassRegistrationComponent } from './registrations/class-registration/class-registration.component';
import { SetPasswordComponent } from './users/set-password/set-password.component';
import { httpInterceptorProviders } from './http-interceptors/index';
import { DigitOnlyDirective } from './directives/digit-only.directive';
import { UserListComponent } from './users/user-list/user-list.component';
import { ManageUsersComponent } from './manage-site/manage-users/manage-users.component';
import { AddGalleryComponent } from './gallery/add-gallery/add-gallery.component';
import { ConfirmationDialogComponent } from './commons/confirmation-dialog/confirmation-dialog.component';
import { ModalComponent } from './commons/modal/modal.component';
import { MessageService } from './services/message.service';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    HomeComponent,
    FooterComponent,
    ElementDimensionsDirective,
    ImageRolloverDirective,
    SiteHeaderComponent,
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
    EditPersonalGalleryComponent,
    HvnHoverDirective,
    AuthorPhotoComponent,
    PaypalButtonComponent,
    ManageSiteComponent,
    PrettyPrintPipe,
    ManageGalleriesComponent,
    SafeHtmlPipe,
    AddAnnounceComponent,
    AnnouncementComponent,
    EditAnnouncementComponent,
    NewUserComponent,
    EditUserComponent,
    ChangePasswordComponent,
    EditClassComponent,
    VnpsClassesComponent,
    CampingRegistrationComponent,
    ClassRegistrationComponent,
    SetPasswordComponent,
    DigitOnlyDirective,
    UserListComponent,
    ManageUsersComponent,
    AddGalleryComponent,
    ConfirmationDialogComponent,
    ModalComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AppRoutingModule,
    EditorModule
  ],
  providers: [
    RouterLinkActive,
    ApiService,
    AuthService,
    AuthGuard,
    DomService,
    ModalService,
    GalleryPhotosResolve,
    GalleriesResolve,
    MessageService,
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
