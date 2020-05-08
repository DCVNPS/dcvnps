import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../../api/services/api.service';
import { Router } from '@angular/router';
import { Gallery } from '../../../shared/models/interfaces';
import { GalleryDataService } from '../../services/gallery-data.services';

@Component({
  selector: 'vnps-gallery-add',
  templateUrl: './gallery-add.component.html',
  styleUrls: ['./gallery-add.component.css']
})
export class GalleryAddComponent implements OnInit {

  galleryForm: FormGroup;
  imgUrl: any;
  upldFile: File;
  uploadResponse: boolean;
  errorMsg: string;
  showDialog: boolean;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm() {
    this.galleryForm = this.formBuilder.group({
      galleryName: this.formBuilder.control(null, [Validators.required]),
      galleryPhoto: this.formBuilder.control(null, [Validators.required]),
      activeInd: this.formBuilder.control('N', [Validators.required])
    });
  }

  get f() { return this.galleryForm.controls; }

  get formValues() { return this.galleryForm.value; }

  onSaveGallery() {
    const uploadURL = 'galleries';
    const formData = new FormData();
    formData.append('photoFile', this.upldFile);
    formData.append('gallery', this.formValues.galleryName);
    formData.append('profilePhoto', this.upldFile.name.toLowerCase());
    formData.append('activeInd', this.formValues.activeInd);
    this.api.saveGallery(uploadURL, formData)
      .subscribe((res) => {
          this.router.navigate(['/admin/galleries']);
        });
  }


  onCancel() {
    if (this.galleryForm.dirty) {
      this.showDialog = true;
    } else {
      this.router.navigate(['/admin/galleries']);
    }
  }

  updateImageDisplay(files: Array<File>) {
    this.errorMsg = '';
    this.imgUrl = undefined;
    if (files.length === 0) {
      this.errorMsg = 'Error: File is empty';
      return;
    }
    const mimeType = files[0].type;
    // console.log(files[0]);
    if (mimeType.match(/image\/*/) == null) {
      this.errorMsg = 'Only images are supported.';
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.imgUrl = reader.result;
    };
    this.upldFile = files[0];
  }

  onAcceptDenyAdd(accept: boolean) {
    this.showDialog = false;
    if (accept) {
      this.galleryForm.reset();
      this.router.navigate(['/admin/galleries']);
    }
  }

}
