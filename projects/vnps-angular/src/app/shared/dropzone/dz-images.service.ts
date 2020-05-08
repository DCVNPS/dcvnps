import { Injectable } from '@angular/core';
import { ImageInfo } from '../models/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DzImagesService {

  private validImages: Array<ImageInfo> = [];
  private invalidImages: Array<ImageInfo> = [];
  constructor() { }

  get ValidImages() { return this.validImages; }
  set ValidImages(images: Array<ImageInfo>) {
    if ( images.length > 0 ) {
      this.validImages = images;
    }
  }

  addValidImage(image: ImageInfo) {
    if (image) {
      this.validImages.push(image);
    }
  }

  removeValidImage(rmIndex: number) {
      this.validImages.splice(rmIndex, 1);
  }

  findValidImage(fileName: string) {
    const validImage: ImageInfo | undefined = this.validImages.find( vm => vm.imgFile.name === fileName );
    return validImage;
  }

  get InValidImages() { return this.invalidImages; }
  set InValidImages(images: Array<ImageInfo>) {
    if ( images.length > 0 ) {
      this.invalidImages = images;
    }
  }

  addInvalidImage(image: ImageInfo) {
    if (image) {
      this.invalidImages.push(image);
    }
  }

  removeInvalidImage(rmIndex: number) {
      this.invalidImages.splice(rmIndex, 1);
  }

  findInvalidImage(fileName: string) {
    const invalidImage: ImageInfo | undefined = this.invalidImages.find( vm => vm.imgFile.name === fileName );
    return invalidImage;
  }

  clearValidImages() {
    this.validImages = [];
  }

  clearInvalidImages() {
    this.invalidImages = [];
  }

  clearAllImages() {
    this.clearValidImages();
    this.clearInvalidImages();
  }
}
