import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-gallery',
  templateUrl: './add-gallery.component.html',
  styleUrls: ['./add-gallery.component.scss']
})
export class AddGalleryComponent implements OnInit{

  @Output() finishWork: EventEmitter<any> = new EventEmitter<any>();
  public galleryForm: FormGroup;
  public errorMsg: string;
  public imgUrl:any;
  private upldFile:File;
  private uploadResponse: boolean;
  public error: any;
  constructor( private api: ApiService, private  formBuilder: FormBuilder) { }

  ngOnInit() {
    this.buildForm();
  }

  get f() { return this.galleryForm.controls;}

  get formValue(){ return this.galleryForm.value;};

  buildForm(){
    this.galleryForm = this.formBuilder.group({
      galleryName: this.formBuilder.control(null, [Validators.required]),
      galleryPhoto: this.formBuilder.control(null, [Validators.required])
    });
  }

  onSubmitForm(){
    // console.log(this.formValue);
    // console.log(this.upldFile);
    this.addGallery();
  }

  onCancel(){
    this.galleryForm.reset();
    this.finishWork.emit({finish:true});
  }

  updateImageDisplay(files:Array<File>){
    this.errorMsg = undefined;
    this.imgUrl = undefined;
    if(files.length === 0){
      this.errorMsg = "Error: File is empty";
      return;
    }
    const mimeType = files[0].type;
    // console.log(files[0]);
    if( mimeType.match(/image\/*/) == null){
      this.errorMsg="Only images are supported.";
      return;
    }
    const reader = new FileReader();;
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.imgUrl = reader.result;
    }
    this.upldFile = files[0];
  }

  addGallery() {
    const uploadURL = `galleries/upload/${this.formValue.galleryName.replace(' ','_')}`;
    const formData = new FormData();
    formData.append('file', this.upldFile);
    // formData.append('gallery', JSON.stringify(gallery));
    formData.append('galleryId',  null);
    formData.append('gallery', this.formValue.galleryName);
    formData.append('profilePhoto', this.upldFile.name);
    formData.append('activeInd', 'Y');
    formData.append('updatedUserid', null);
    console.log(uploadURL);
    // console.log(formData.get('file'));
    // console.log(formData.get('gallery'));
    this.api.galleriesUpload(uploadURL, formData)
      .subscribe(
        (res) => {
          this.uploadResponse = res;
          let gallery = this.uploadResponse['gallery'];
          if (gallery) {
            // console.log(this.photo);
            // upload succeeded, raise photoAdded event
            this.finishWork.emit({finish:true, addedGallery: gallery});           
          }
        },
        (err) => { 
          this.errorMsg = err.message; 
          this.finishWork.emit({finish:true, errorMsg: this.errorMsg});
        }
      );
  }
}
