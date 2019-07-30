/*
  This nice dropzone based on Luis Moncaris's Tutorial title
  How to create a Drag and Drop file directive in angular2 with angular-cli
  URL: https://scotch.io/@minrock/how-to-create-a-drag-and-drop-file-directive-in-angular2-with-angular-cli-part-1
    https://scotch.io/@minrock/how-to-create-a-drag-and-drop-file-directive-in-angular2-with-angular-cli-part-2
  Code was expand to include the review before uploading to server.
*/
import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Gallery } from '../models/gallery.model';
import { ImageInfo } from '../models/image-model';
import { RegexService } from '../services/regex.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent implements OnInit {

  public reviewUrl: Array<any> = [];
  public reviewInvalidUrl: Array<any> = [];
  public validImages: Array<ImageInfo> = [];
  public invalidImages: Array<ImageInfo> = [];
  public uploadResponse: Object = { status: '', message: '', filePath: '' };
  public allowed_ext: Array<string> = ['png', 'jpg', 'bmp', 'ico'];
  public error: string;
  public showBackMenu: false;
  public galleries: Array<Gallery> = [];
  private selectedGallery: Gallery;
  private upldGallery: FormControl;
  private upldYear: FormControl;
  public uploadForm: FormGroup;
  public years: Array<string>;
  private selectedYear: string;
  private fileNamePattern = '^[a-z0-9]+\\.[a-z0-9]+\\_.*\\.[a-z]{3}$';

  @Input() private config: any = { 'gallery': undefined, 'year': undefined, 'showBackMenu': false };
  constructor(private formBuilder: FormBuilder,
    private api: ApiService,
    private auth: AuthService,
    private regexSrvc: RegexService,
    private location: Location) {
    // Get the galleries list from database
    this.years = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'];
    // this.selectedYear = (new Date()).getFullYear().toString();
    this.upldGallery = new FormControl(this.selectedGallery, Validators.required);
    this.upldYear = new FormControl(this.selectedYear, Validators.required);
    this.uploadForm = this.formBuilder.group({
      upldGallery: this.upldGallery,
      yearPicker: this.upldYear
    });
  }

  selectedGalleryText() {
    const role = this.auth.getRole();
    let gText = 'All';
    switch (role.substring(0, 4)) {
      case 'LVL3':
        gText = 'level3';
        break;
      case 'LVL2':
        gText = 'level2';
        break;
      case 'LVL1':
        gText = 'level1';
        break;
      case 'MBMR':
        gText = 'member';
        break;
      default:
        gText = 'All';
        break;
    }
    // console.log({ 'role': role, 'level': gText });
    return gText;
  }
  ngOnInit() {
    // console.log(this.config);
    const galleryText = this.config.gallery || this.selectedGalleryText();
    this.selectedYear = this.config.year || (new Date()).getFullYear().toString();
    this.showBackMenu = this.config.showBackMenu;
    this.api.get('galleries')
      .subscribe(async (data) => {
        this.galleries = await Array.from(data);
        this.selectedGallery = this.galleries.find(g => g.gallery === galleryText);
        if (this.selectedGallery) {
          // console.log(this.selectedGallery);
          this.upldGallery.setValue(this.selectedGallery);
          this.upldGallery.disable({ onlySelf: true });
        }
        this.upldYear.setValue(this.selectedYear);
        if (this.config.year) {
          this.upldYear.disable({onlySelf: true})
        }
      });
  }

  onFileChange(files: Array<File>) {
    if (files.length > 0) {
      // this.fileArray = files;
      for (let i = 0; i < files.length; i++) {
        const [author, filename] = (files[i].name).split('_');
        const curImage = this.validImages.find((img) => img.imgFile.name === files[i].name);
        if (!curImage) {
          const imgInfo = new ImageInfo();
          imgInfo.imgFile = files[i];
          imgInfo.filename = filename;
          imgInfo.author = author;
          imgInfo.size = files[i].size;
          const reader = new FileReader();
          reader.onload = (event) => {
            // below code is invalid due to EventTarget interface
            // does not have result.
            // this.reviewUrl.push(event.target.result);
            // Workaround
            // console.log(reader.result);
            // Think about resize the image!!!
            imgInfo.reviewUrl = reader.result;
            const img = new Image();
            img.src = imgInfo.reviewUrl;
            img.onload = () => {
              // alert(`width: ${img.width} height: ${img.height}`);
              imgInfo.portrait = img.width < img.height;
              // this.portraitInd.push(isPortrait);
            };
          }
          reader.readAsDataURL(files[i]);
          this.validImages.push(imgInfo);
        }
      }
      // console.log(this.portraitInd);
    }
  }

  onInvalidFileChange(files: Array<File>) {
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        // don't add duplicate image.
        const curImage = this.invalidImages.find((img) => img.imgFile.name === files[i].name);
        if (!curImage) {
          const imgInfo = new ImageInfo();
          imgInfo.imgFile = files[i];
          imgInfo.filename = files[i].name;
          imgInfo.size = files[i].size;
          const allowedExt = this.regexSrvc.isAllowedExt(files[i].name, this.allowed_ext);
          if (allowedExt) {
            const reader = new FileReader();
            reader.onload = (event) => {
              imgInfo.reviewUrl = reader.result;
            }
            reader.readAsDataURL(files[i]);
          } else {
            imgInfo.reviewUrl = null;
            if (this.isValidFileName(files[i].name)) {
              const [author, filename] = (files[i].name).split('_');
              imgInfo.author = author;
              imgInfo.filename = filename;
            }
          }
          this.invalidImages.push(imgInfo);
        }
      }
    }
  }

  onGallerySelectChanged(event) {
    this.selectedGallery = event;
    this.validImages.forEach(item => { item.galleryid = event.galleryId; item.gallery = event.gallery });
    // console.log(this.validImages);
  }

  onYearSelectChanged(event) {
    this.selectedYear = event;
    this.validImages.forEach(item => item.year = event);
    // console.log(this.validImages);
  }

  removeFile(index: number) {
    this.validImages.splice(index, 1);
  }

  removeInvalidFile(index: number) {
    this.invalidImages.splice(index, 1);
  }

  removeAllFiles() {
    this.invalidImages = [];
    this.validImages = [];
  }

  uploadFile(imageInfo: ImageInfo) {
    // console.log(this.selectedGallery);
    // const imageInfo = this.validImages[index];
    imageInfo.galleryid = this.selectedGallery.galleryId;
    imageInfo.gallery = this.selectedGallery.gallery;
    imageInfo.year = this.selectedYear.toString();
    console.log(imageInfo);
    this.api.upload(imageInfo)
      .subscribe(
        (res) => { this.uploadResponse = res; },
        (err) => { this.error = err; }
      );
  }

  uploadAllFiles() {
    this.validImages.forEach(img => {
      this.uploadFile(img);
    });
  }

  isValidFileName(fileName: string): boolean {
    return this.regexSrvc.validFileName(fileName, this.fileNamePattern);
  }

  goBack() {
    this.location.back();
  }
}
