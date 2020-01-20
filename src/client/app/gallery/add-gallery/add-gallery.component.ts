import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-add-gallery',
  templateUrl: './add-gallery.component.html',
  styleUrls: ['./add-gallery.component.scss']
})
export class AddGalleryComponent implements OnInit {

  @Output() galleryAdded: EventEmitter<boolean> = new EventEmitter<boolean>();
  public galleryForm: FormGroup;
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
    })
  }

  onSubmitForm(){
    this.galleryAdded.emit(true);
  }
}
