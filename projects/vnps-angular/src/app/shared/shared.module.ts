import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PhotoPopupComponent } from './photo-popup/photo-popup.component';
import { HvnCarouselComponent } from './hvn-carousel/hvn-carousel.component';
import { SlideImageSizeDirective } from './directives/slide-image-size.directive';
import { HvnHoverDirective } from './directives/hvn-hover.directive';
import { PaypalButtonComponent } from './paypal-button/paypal-button.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SafeHtmlPipe } from './pipes/safe-html.pipe';
import { PrettyPrintPipe } from './pipes/pretty-print.pipe';
import { SortDescPipe } from './pipes/sort.desc.pipe';
import { CardImageSizeDirective } from './directives/card-image-size.directive';
import { AuthorPhotoComponent } from './author-photo/author-photo.component';
import { DropzoneComponent } from './dropzone/dropzone.component';
import { CommonService } from './services/common.service';
import { RegexService } from './services/regex.service';
import { DndDirective } from './dropzone/dnd.driective';
import { DzImagesService } from './dropzone/dz-images.service';

@NgModule({
  declarations: [
    PhotoPopupComponent,
    HvnCarouselComponent,
    SlideImageSizeDirective,
    HvnHoverDirective,
    CardImageSizeDirective,
    DndDirective,
    PaypalButtonComponent,
    FooterComponent,
    HeaderComponent,
    AuthorPhotoComponent,
    SafeHtmlPipe,
    PrettyPrintPipe,
    SortDescPipe,
    DropzoneComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    PhotoPopupComponent,
    HvnCarouselComponent,
    AuthorPhotoComponent,
    PaypalButtonComponent,
    DropzoneComponent,
    SlideImageSizeDirective,
    HvnHoverDirective,
    CardImageSizeDirective,
    SafeHtmlPipe,
    PrettyPrintPipe,
    SortDescPipe,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    CommonService,
    RegexService,
    DzImagesService
  ]
})
export class SharedModule { }
