import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/upload.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Gallery } from '../shared/gallery.model';

@Component({
  selector: 'app-dropzone',
  templateUrl: './dropzone.component.html',
  styleUrls: ['./dropzone.component.scss']
})
export class DropzoneComponent implements OnInit {

  public fileArray: Array<File> = [];
  public invalidFileArray: Array<File> = [];
  public reviewUrl: Array<any> = [];
  public reviewInvalidUrl: Array<any> = [];
  public uploadResponse: Object = { status: '', message: '', filePath: '' };
  public error: string;
  public galleries: Array<Gallery> = [];
  private upldGallery: FormControl;
  private upldYear : FormControl;
  private uploadForm: FormGroup;
  private years: Array<number>;
  constructor(private formBuilder: FormBuilder,
    private uplder: UploadService,
    private api: ApiService) { 
      // Get the galleries list from database
      api.get('/galleries')
      .subscribe(async (data) => {
        // data.forEach((item) => {
        //   this.galleries.push(item);
        // });
        this.galleries = await Array.from(data);
        console.log(this.galleries);
      });
      this.years=[2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020];
    }

  ngOnInit() {
    this.upldGallery = new FormControl();
    this.upldYear = new FormControl();
    this.uploadForm = this.formBuilder.group({
      upldGallery: this.upldGallery,
      yearPicker: this.upldYear
    })
  }

  onFileChange(files: Array<File>) {
    if (files.length > 0) {
      // this.fileArray = files;
      for (let i = 0; i < files.length; i++) {
        const curFile = this.fileArray.find((f) => f.name === files[i].name);
        if (!curFile) {
          this.fileArray.push(files[i]);
          let reader = new FileReader();

          reader.onload = (event) => {
            // below code is invalid due to EventTarget interface 
            // does not have result.
            // this.reviewUrl.push(event.target.result);
            // Workaround
            // console.log(reader.result);
            // Think about resize the image!!!
            this.reviewUrl.push(reader.result);
          }
          reader.readAsDataURL(files[i]);
        }
      };
    }
  }

  onInvalidFileChange(files: Array<File>) {
    if (files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        // don't add duplicate image.
        const curFile = this.invalidFileArray.find((f) => f.name === files[i].name);
        if (!curFile) {
          this.invalidFileArray.push(files[i]);
        }
      }
    }
  }

  removeFile(index: number) {
    this.fileArray.splice(index, 1);
    this.reviewUrl.splice(index, 1);
  }

  removeInvalidFile(index: number) {
    this.invalidFileArray.splice(index, 1);
  }

  removeAllFiles() {
    this.fileArray = [];
    this.reviewUrl = [];
    this.invalidFileArray = [];
  }

  uploadFile(index: number) {
    const upldGalVal = this.uploadForm.controls.upldGallery.value;
    const gallery = this.galleries.find( g => g.galleryId === upldGalVal);
    const gYear = this.uploadForm.controls.yearPicker.value;
    this.uplder.upload(this.fileArray[index], gallery, gYear)
      .subscribe(
        (res) => { this.uploadResponse = res; },
        (err) => { this.error = err;}
      );
  }
}
