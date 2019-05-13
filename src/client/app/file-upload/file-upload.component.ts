import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { UploadService } from '../services/upload.service';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {

  uploadForm: FormGroup;
  error: string;
  gallery: string ='about';
  uploadResponse: Object = {status:'', message:'', filePath:''};
  imageFile: FormControl;
  constructor(private formBuilder : FormBuilder,
      private upldr: UploadService) { }

  ngOnInit() {
    this.imageFile = new FormControl('');
    this.uploadForm = this.formBuilder.group({
      imageFile: this.imageFile
    })
  }

  onFileChange(event){
    if(event.target.files.length > 0){
      const file = event.target.files[0];
      this.uploadForm.get('imageFile').setValue(file);
    }
  }

  onSubmit(){
    const formData = new FormData();
    // formData.append('file', this.uploadForm.get('imageFile').value);
    const file = this.uploadForm.get('imageFile').value;
    this.upldr.upload(file,'about')
    .subscribe(
      (res) => this.uploadResponse = res,
      (err) => this.error = err );
  }
}
