/*
  This nice dropzone based on Luis Moncaris's Tutorial title
  How to create a Drag and Drop file directive in angular2 with angular-cli
  URL: https://scotch.io/@minrock/how-to-create-a-drag-and-drop-file-directive-in-angular2-with-angular-cli-part-1
    https://scotch.io/@minrock/how-to-create-a-drag-and-drop-file-directive-in-angular2-with-angular-cli-part-2
  Code was expand to include the review before uploading to server.
*/
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ImageInfo, Gallery, Photo, DropzoneConfig } from '../models/interfaces';
import { ApiService } from '../../api/services/api.service';
import { AuthService } from '../../auth/services/auth.service';
import { CommonService } from '../services/common.service';
import { RegexService } from '../services/regex.service';
import { DzImagesService } from './dz-images.service';
import { map } from 'rxjs/operators';
import { HttpEventType, HttpEvent } from '@angular/common/http';

@Component({
  selector: 'vnps-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent implements OnInit {

  reviewUrl: Array<any> = [];
  reviewInvalidUrl: Array<any> = [];
  uploadResponse = { status: '', message: '', filePath: '' };
  allowedExt: Array<string> = ['png', 'jpg', 'jpeg', 'bmp', 'ico'];
  error: string;
  galleries: Array<Gallery> = [];
  gallery: string | undefined;
  uploadForm: FormGroup;
  years: Array<string>;
  progress: number;

  private selectedGallery: Gallery | undefined;
  private selectedYear: string;
  private photo: Photo;
  private fileNamePattern = '^[a-z0-9]+\\.[a-z0-9]+\\_.*\\.[a-z]{3}$';

  @Input() config: DropzoneConfig;
  @Output() photoAdded: EventEmitter<Photo> = new EventEmitter<Photo>();

  constructor(
    private formBuilder: FormBuilder,
    private api: ApiService,
    private auth: AuthService,
    private dzImags: DzImagesService,
    private comSrv: CommonService,
    private regexSrvc: RegexService) { }

  ngOnInit() {
    this.builForm();
    this.initData();
    this.setFormValues();
  }

  builForm() {
    this.uploadForm = this.formBuilder.group({
      upldGallery: this.formBuilder.control(null, [Validators.required]),
      upldYear: this.formBuilder.control(null, [Validators.required])
    });
  }

  get ValidImages() {
    return this.dzImags.ValidImages;
  }

  get InvalidImages() {
    return this.dzImags.InValidImages;
  }

  get f() { return this.uploadForm.controls; }

  get fv() { return this.uploadForm.getRawValue(); }

  setFormValues() {
    if (this.config.year) {
      this.f.upldYear.patchValue(this.config.year);
      this.f.upldYear.disable({ onlySelf: true });
    }
    if (this.config.gallery) {
      this.f.upldGallery.patchValue(this.gallery);
      this.f.upldGallery.disable({ onlySelf: true });
    }
  }

  initData() {
    // Get the galleries list from database
    this.progress = 0;
    this.gallery = this.config.gallery || this.auth.adminLevel?.level;
    const galleryId = this.config.galleryId || undefined;
    this.selectedYear = this.config.year || (new Date()).getFullYear().toString();
    this.years = this.comSrv.getYearLov(parseInt(this.selectedYear, 10));
    this.api.get('galleries')
      .subscribe((data) => {
        this.galleries = data;
        this.selectedGallery = this.galleries.find(g => g.galleryId === galleryId);
        if (this.selectedGallery) {
          this.uploadForm.controls.upldGallery.patchValue(this.selectedGallery);
          this.uploadForm.controls.upldGallery.disable({ onlySelf: true });
        }
      });
  }
  onFileChange(files: Array<File>) {
    if (files.length > 0) {
      // this.fileArray = files;
      for (const f of files) {
        const fileNameParts = (f.name).split('_');
        const author = fileNameParts[0];
        fileNameParts.splice(0, 1);
        // console.log(fileNameParts);
        const filename = fileNameParts.join('_');
        // const curImage = this.validImages.find((img) => img.imgFile.name === f.name);
        const curImage = this.dzImags.findValidImage(f.name);
        if (!curImage) {
          const imgInfo: ImageInfo = {
            imgFile: f,
            filename,
            author,
            size: f.size
          };
          const reader = new FileReader();
          reader.onload = (event) => {
            // below code is invalid due to EventTarget interface
            // does not have result.
            // this.reviewUrl.push(event.target.result);
            // Workaround
            // console.log(reader.result);
            // Think about resize the image!!!
            imgInfo.reviewUrl = reader.result || '';
            const img = new Image();
            img.src = imgInfo.reviewUrl.toString();
            img.onload = () => {
              imgInfo.portrait = img.width < img.height;
            };
          };
          reader.readAsDataURL(f);
          this.dzImags.addValidImage(imgInfo);
        }
      }
    }
  }

  onInvalidFileChange(files: Array<File>) {
    if (files.length > 0) {
      for (const f of files) {
        // don't add duplicate image.
        // const curImage = this.invalidImages.find((img) => img.imgFile.name === f.name);
        const curImage = this.dzImags.findInvalidImage(f.name);
        if (!curImage) {
          const imgInfo: ImageInfo = {
            imgFile: f,
            filename: f.name,
            author: '',
            size: f.size,
            reviewUrl: ''
          };
          const allowedExt = this.regexSrvc.isAllowedExt(f.name, this.allowedExt);
          if (allowedExt) {
            const reader = new FileReader();
            reader.onload = (event) => {
              imgInfo.reviewUrl = reader.result?.toString();
            };
            reader.readAsDataURL(f);
          } else {
            imgInfo.reviewUrl = '';
            if (this.isValidFileName(f.name)) {
              const [author, filename] = (f.name).split('_');
              imgInfo.author = author;
              imgInfo.filename = filename;
            }
          }
          this.dzImags.addInvalidImage(imgInfo);
          console.log(this.InvalidImages);
        }
      }
    }
  }

  onGallerySelectChanged(event: any) {
    this.selectedGallery = event;
    this.ValidImages.forEach(img => {
      img.galleryid = event.galleryId;
      img.gallery = event.gallery;
    });
    console.log(this.dzImags.ValidImages);
  }

  onYearSelectChanged(event: any) {
    this.selectedYear = event;
    this.ValidImages.forEach(img => img.year = event);
    console.log(this.dzImags.ValidImages);
  }

  removeFile(index: number) {
    this.dzImags.removeValidImage(index);
  }

  removeInvalidFile(index: number) {
    this.dzImags.removeInvalidImage(index);
  }

  removeAllFiles() {
    this.dzImags.clearAllImages();
  }

  uploadFile(index: number) {
    const galleryid = this.fv.upldGallery ? this.fv.upldGallery.galleryId : '';
    const gallery = this.fv.upldGallery ? this.fv.upldGallery.gallery : '';
    const uploadURL = 'galleryphotos';
    let img: ImageInfo = this.ValidImages[index];
    // const { galleryId, fileName, author, portrait }
    const formData = new FormData();
    formData.append('file', img.imgFile);
    formData.append('galleryId', galleryid);
    formData.append('gallery', gallery);
    formData.append('year', this.fv.upldYear);
    formData.append('fileName', img.filename);
    formData.append('author', img.author);
    formData.append('portrait', img.portrait ? img.portrait.toString() : 'false');
    formData.forEach(c => console.log(c));
    this.api.saveGalleryPhoto(uploadURL, formData)
      .subscribe(
        (event: HttpEvent<any>) => {
          switch (event.type) {
            case HttpEventType.Sent:
              console.log('Request has been made');
              break;
            case HttpEventType.ResponseHeader:
              console.log('Response header has been received.');
              break;
            case HttpEventType.UploadProgress:
              const loaded: number = event.loaded;
              const total: number = event.total ? event.total : 1;
              this.progress = Math.round(loaded / total * 100);
              break;
            case HttpEventType.Response:
              this.photo = event.body;
              console.log(this.photo);
              img.uploaded = true;
              break;
            default:
              console.log(`Default event type: ${event.type}`);
          }
        },
        (err) => { this.error = err; }
      );
  }

  uploadAllFiles() {
    let i = 0;
    this.ValidImages.forEach(img => {
      if (!img.uploaded) {
        this.uploadFile(i);
      } else {
        console.log(`image ${img.filename} has been uploaded.`);
      }
      i++;
    });
  }

  isValidFileName(fileName: string): boolean {
    return this.regexSrvc.validFileName(fileName, this.fileNamePattern);
  }
}
