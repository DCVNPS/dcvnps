/*
  This nice dropzone based on Luis Moncaris's Tutorial title
  How to create a Drag and Drop file directive in angular2 with angular-cli
  URL: https://scotch.io/@minrock/how-to-create-a-drag-and-drop-file-directive-in-angular2-with-angular-cli-part-1
    https://scotch.io/@minrock/how-to-create-a-drag-and-drop-file-directive-in-angular2-with-angular-cli-part-2
  Code was expand to include the review before uploading to server.
*/
import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/upload.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Gallery } from '../shared/gallery.model';
import { ImageInfo } from '../shared/image.model';
import { RegexService } from '../services/regex.service';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent implements OnInit {

  public reviewUrl: Array<any> = [];
  public reviewInvalidUrl: Array<any> = [];
  public validImageInfos: Array<ImageInfo> = [];
  public invalidImageInfos: Array<ImageInfo> = [];
  public uploadResponse: Object = { status: '', message: '', filePath: '' };
  public allowed_ext: Array<string> = ['png', 'jpg', 'bmp', 'ico'];
  public error: string;
  public galleries: Array<Gallery> = [];
  private portraitInd: Array<boolean> = [];
  private upldGallery: FormControl;
  private upldYear: FormControl;
  private uploadForm: FormGroup;
  private years: Array<number>;
  private fileArray: Array<File> = [];
  private invalidFileArray: Array<File> = [];
  private fileNamePattern = '^[a-z0-9]+\\.[a-z0-9]+\\_.*\\.[a-z]{3}$';
  constructor(private formBuilder: FormBuilder,
    private uplder: UploadService,
    private api: ApiService,
    private regexSrvc: RegexService) {
    // Get the galleries list from database
    this.api.get('galleries')
      .subscribe(async (data) => {
        this.galleries = await Array.from(data);
        // console.log(this.galleries);
      });
    this.years = [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];
  }

  ngOnInit() {
    this.upldGallery = new FormControl(null, Validators.required);
    this.upldYear = new FormControl(null, Validators.required);
    this.uploadForm = this.formBuilder.group({
      upldGallery: this.upldGallery,
      yearPicker: this.upldYear
    });
  }

  onFileChange(files: Array<File>) {
    if (files.length > 0) {
      // this.fileArray = files;
      for (let i = 0; i < files.length; i++) {
        const curFile = this.fileArray.find((f) => f.name === files[i].name);
        if (!curFile) {
          const imgInfo = new ImageInfo();
          const reader = new FileReader();
          let isPortrait = false;
          reader.onload = (event) => {
            // below code is invalid due to EventTarget interface 
            // does not have result.
            // this.reviewUrl.push(event.target.result);
            // Workaround
            // console.log(reader.result);
            // Think about resize the image!!!
            this.reviewUrl.push(reader.result);
            const img = new Image();
            img.src = this.reviewUrl[this.reviewUrl.length - 1];
            img.onload = () => {
              // alert(`width: ${img.width} height: ${img.height}`);
              isPortrait = img.width < img.height;
              // this.portraitInd.push(isPortrait);
            };
          }
          reader.readAsDataURL(files[i]);

          this.fileArray.push(files[i]);
          const [author, filename] = (files[i].name).split('_');
          imgInfo.filename = files[i].name;
          imgInfo.author = author;
          imgInfo.size = files[i].size;
          imgInfo.portrait = isPortrait;
          this.validImageInfos.push(imgInfo);
        }
      }
      // console.log(this.portraitInd);
    }
  }

  onInvalidFileChange(files: Array<File>) {
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        // don't add duplicate image.
        const curFile = this.invalidFileArray.find((f) => f.name === files[i].name);
        if (!curFile) {
          const imgInfo = new ImageInfo();
          imgInfo.filename = files[i].name;
          imgInfo.size = files[i].size;
          this.invalidFileArray.push(files[i]);
          const allowedExt = this.regexSrvc.isAllowedExt(files[i].name, this.allowed_ext);
          if (allowedExt) {
            const reader = new FileReader();
            reader.onload = (event) => {
              this.reviewInvalidUrl.push(reader.result);
            }
            reader.readAsDataURL(files[i]);
          } else {
            this.reviewInvalidUrl.push(null);
            if(this.isValidFileName(files[i].name)){
              imgInfo.author = files[i].name.split('_')[1];
            }
          }
          this.invalidImageInfos.push(imgInfo);
        }
      }
    }
  }

  onGallerySelectChanged(event){
    const galleryid = event.target.value;
    const gallery = event.target.options[event.target.selectedIndex].text.toLowerCase();
    console.log(`galleryId: ${galleryid} --- gallery: ${gallery}`);
    this.validImageInfos.forEach( item => { item.galleryid = galleryid; item.gallery = gallery});
    console.log(this.validImageInfos);
  }

  onYearSelectChanged(event){
    const year = event.target.value;
    this.validImageInfos.forEach( item => item.year = year);
    console.log(this.validImageInfos);
  }

  removeFile(index: number) {
    this.fileArray.splice(index, 1);
    this.reviewUrl.splice(index, 1);
  }

  removeInvalidFile(index: number) {
    this.invalidFileArray.splice(index, 1);
    this.reviewInvalidUrl.splice(index, 1);
  }

  removeAllFiles() {
    this.fileArray = [];
    this.reviewUrl = [];
    this.invalidFileArray = [];
    this.reviewInvalidUrl = [];
  }

  uploadFile(index: number) {
    const gallery = this.galleries.find(g => g.galleryId ===  this.uploadForm.controls.upldGallery.value);
    const imageInfo = this.validImageInfos[index];
    imageInfo.galleryid = gallery.galleryId;
    imageInfo.gallery = gallery.gallery;
    imageInfo.year = this.uploadForm.controls.yearPicker.value;
    // console.log(imageInfo);
    this.uplder.upload(this.fileArray[index],imageInfo)
      .subscribe(
        (res) => { this.uploadResponse = res; },
        (err) => { this.error = err; }
      );
  }
  isValidFileName(fileName: string): boolean{
    return this.regexSrvc.validFileName(fileName, this.fileNamePattern);
  }
}
