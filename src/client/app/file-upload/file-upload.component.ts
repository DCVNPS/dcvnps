import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { UploadService } from '../services/upload.service';
import { ApiService } from '../shared/api.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  uploadForm: FormGroup;
  error: string;
  gallery: string = '';
  galleries: Array<string> = [];
  uploadResponse: Object = { status: '', message: '', filePath: '' };
  imageFile: FormControl;
  upldGallery: FormControl;
  reviewUrl: Array<any> = [];
  constructor(private formBuilder: FormBuilder,
    private upldr: UploadService,
    private api: ApiService) {
    api.get('/galleries')
      .subscribe((data) => {
        data.forEach((item) => {
          this.galleries.push(item.gallery);
        })
      });
  }

  ngOnInit() {
    this.imageFile = new FormControl();
    this.upldGallery = new FormControl();
    this.uploadForm = this.formBuilder.group({
      imageFile: this.imageFile,
      upldGallery: this.upldGallery
    })
  }

  onFileChange(event) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('imageFile').setValue(file);
    }
  }
  onSelectFile(event){
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event) => {
          console.log(event.target.result );
          this.reviewUrl.push(event.target.result);
        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }
  // onSubmit() {
  //   const formData = new FormData();
  //   // formData.append('file', this.uploadForm.get('imageFile').value);
  //   const file = this.uploadForm.get('imageFile').value;
  //   this.gallery = this.uploadForm.controls.upldGallery.value;
  //   this.upldr.upload(file, this.gallery, '2019')
  //     .subscribe(
  //       (res) => this.uploadResponse = res,
  //       (err) => this.error = err);
  // }
}
