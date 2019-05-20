import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/upload.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiService } from '../services/api.service';

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
  public galleries: Array<string> = [];
  public upldGallery: FormControl;
  public uploadForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private uplder: UploadService,
    private api: ApiService) { 
      // Get the galleries list from database
      api.get('/galleries')
      .subscribe((data) => {
        data.forEach((item) => {
          this.galleries.push(item.gallery);
        })
      });
    }

  ngOnInit() {
    this.upldGallery = new FormControl();
    this.uploadForm = this.formBuilder.group({
      upldGallery: this.upldGallery
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
    const gallery = this.uploadForm.controls.upldGallery.value;
    this.uplder.upload(this.fileArray[index], gallery, '2019')
      .subscribe(
        (res) => { this.uploadResponse = res; },
        (err) => { this.error = err;}
      );
  }
}
