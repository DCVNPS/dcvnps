import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Announcement } from '../models/announcement-model';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';

@Component({
  selector: 'app-edit-announcement',
  templateUrl: './edit-announcement.component.html',
  styleUrls: ['./edit-announcement.component.scss']
})
export class EditAnnouncementComponent implements OnInit {
@Input() announcement: Announcement;
@Output() editAncmntEvent: EventEmitter<Object> = new EventEmitter<Object>();
private tinyInit: Object;
public title: string;
public content: string;
public postedBy: string;
public postdDate: Date;
  constructor() { }

  ngOnInit() {
    // console.log(this.announcement);
    this.title = this.announcement.title;
    this.content = this.announcement.content;
    this.postedBy = this.announcement.postedBy;
    this.postdDate = this.announcement.postedDate
    this.tinyInit = {
      plugins: 'fullscreen image media link insertdatetime advlist lists wordcount imagetools',
      // tslint:disable-next-line: max-line-length
      toolbar: 'formatselect | bold italic forecolor backcolor permanentpen formatpainter | link image media| alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent',
      height: 400
    };
  }
  onSubmit() {
    const updtAncmnt = this.announcement;
    updtAncmnt.title = this.title;
    updtAncmnt.content = this.content;
    // Call api.saveAncmnt();
    // console.log(updtAncmnt);
    this.resetForm();
    this.editAncmntEvent.emit(updtAncmnt);
  }
  onCancel() {
    this.editAncmntEvent.emit();
  }
  resetForm() {
    this.title = null;
    this.content = null;
  }
}
