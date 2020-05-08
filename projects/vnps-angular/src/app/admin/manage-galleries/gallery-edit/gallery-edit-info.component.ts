import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../api/services/api.service';
import { GalleryDataService } from '../../services/gallery-data.services';
import { Gallery } from '../../../shared/models/interfaces';

@Component({
  selector: 'vnps-gallery-edit-info',
  templateUrl: './gallery-edit-info.component.html',
  styleUrls: ['./gallery-edit-info.component.css']
})
export class GalleryEditInfoComponent implements OnInit {

  editGalleryForm: FormGroup;
  imgUrl: string | ArrayBuffer | null;
  upldFile: File;
  uploadResponse: boolean;
  errorMsg: string;
  showDialog: boolean;
  gallery: Gallery;
  private galleryId: string | null | undefined;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private api: ApiService  ) { }

  ngOnInit(): void {
    this.buildForm();
    this.initData();
  }
  get galleryImageSource(): string {
    return `galleries/${this.gallery?.gallery.replace(' ', '_')}/profile/${this.gallery?.profilePhoto}`;
  }

  initData() {
    this.galleryId = this.route.parent?.snapshot.paramMap.get('id');
    const apiUrl = 'galleries/' + this.galleryId;
    this.api.get(apiUrl)
    .subscribe( (data: Array<Gallery>) => {
      this.gallery = data[0];
      this.setFormValues();
      this.imgUrl = this.galleryImageSource;
    });
  }

  buildForm() {
    this.editGalleryForm = this.fb.group({
      galleryName: this.fb.control(null, [Validators.required]),
      galleryPhoto: this.fb.control(null),
      activeInd: this.fb.control(null, [Validators.required])
    });
  }

  get f() { return this.editGalleryForm.controls; }

  get formValues() { return this.editGalleryForm.value; }

  setFormValues() {
    if (this.gallery) {
      this.f.galleryName.setValue(this.gallery.gallery);
      this.f.activeInd.setValue(this.gallery.activeInd);
    }
  }
  onSaveGallery() {
    const uploadURL = 'galleries';
    const formData = new FormData();
    if (this.upldFile) {
      formData.append('photoFile', this.upldFile);
    }
    formData.append('galleryId', this.gallery.galleryId);
    formData.append('gallery', this.formValues.galleryName);
    if ( this.formValues.galleryName !== this.gallery.gallery ) {
      formData.append('oldGalleryName', this.gallery.gallery);
    }
    formData.append('profilePhoto', this.gallery.profilePhoto ? this.gallery.profilePhoto : '');
    formData.append('activeInd', this.formValues.activeInd);
    formData.append('updatedUserId', this.gallery.updatedUserId ? this.gallery.updatedUserId : '');
    const createdDateStr = `${this.gallery.createdDate ? this.gallery.createdDate.toLocaleString() : ''}`;
    formData.append('createdDate', createdDateStr);
    const updtedDateStr = `${this.gallery.updatedDate ? this.gallery.updatedDate.toLocaleString() : ''}`;
    formData.append('updatedDate', updtedDateStr);
    this.api.updateGallery(uploadURL, formData)
      .subscribe((res) => {
          this.router.navigate(['/admin/galleries']);
    });
  }

  onCancel() {
    if (this.editGalleryForm.dirty) {
      this.showDialog = true;
    } else {
      this.router.navigate(['/admin/galleries']);
    }
  }

  updateImageDisplay(files: Array<File>) {
    this.errorMsg = '';
    this.imgUrl = null;
    if (files.length === 0) {
      this.errorMsg = 'Error: File is empty';
      return;
    }
    const mimeType = files[0].type;
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
    // console.log(this.upldFile);
  }

  onAcceptDenyDelete(accept: boolean) {
    this.showDialog = false;
    if (accept) {
      this.editGalleryForm.reset();
      this.router.navigate(['/admin/galleries']);
    }
  }

}
