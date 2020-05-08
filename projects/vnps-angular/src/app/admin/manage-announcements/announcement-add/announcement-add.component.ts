import { Component, OnInit } from '@angular/core';
import { Announcement } from '../../../shared/models/interfaces';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../api/services/api.service';

@Component({
  selector: 'vnps-announcement-add',
  templateUrl: './announcement-add.component.html',
  styleUrls: ['./announcement-add.component.css']
})
export class AnnouncementAddComponent implements OnInit {

  // tslint:disable-next-line: ban-types
  tinyInit: Object;
  title: string;
  content: string;
  announcement: Announcement;
  ancmtForm: FormGroup;
  private componentDirty = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private api: ApiService
  ) { }

  ngOnInit(): void {
    this.initialize();
  }

  initialize(){
    this.tinyInit = {
      plugins: 'fullscreen image media link insertdatetime advlist lists wordcount imagetools',
      // tslint:disable-next-line: max-line-length
      toolbar: 'formatselect | bold italic forecolor backcolor permanentpen formatpainter | link image media| alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent',
      height: 400
    };
    this.announcement = {
      title: this.title,
      content: this.content
    };
    this.buildForm();
  }

  buildForm() {
    this.ancmtForm = this.formBuilder.group({
      title: this.formBuilder.control(this.announcement.title, [Validators.required]),
      content: this.formBuilder.control(this.announcement.content, [Validators.required])
    });
  }

  get formControls() { return this.ancmtForm.controls; }

  get formValues() { return this.ancmtForm.value; }

  saveAnnouncement(): void {
    if ( this.ancmtForm.dirty && this.ancmtForm.valid ) {
      this.announcement.title = this.formValues.title;
      this.announcement.content = this.formValues.content;
      // console.log(this.announcement);
      this.api.post('announcements', this.announcement )
      .subscribe( () => this.onSaveComplete());
    } else if ( !this.ancmtForm.dirty ) {
      this.onSaveComplete();
    }
  }

  onSaveComplete(): void {
    this.ancmtForm.reset();
    this.router.navigate(['/admin/announcements']);
  }
  onCancelAdd(){
    this.componentDirty = this.ancmtForm.dirty;
    this.router.navigate(['/admin/announcements']);
  }

  get isDirty(): boolean { return this.componentDirty; }

}
