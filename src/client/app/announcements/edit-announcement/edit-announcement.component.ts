// Template driven form binding
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Announcement } from '../../models/announcement-model';
import { AnnouncementActions } from '../../models/dcnpsn-enum';

@Component({
  selector: 'app-edit-announcement',
  templateUrl: './edit-announcement.component.html',
  styleUrls: ['./edit-announcement.component.scss']
})
export class EditAnnouncementComponent implements OnInit {
@Input() announcement: Announcement;
@Output() announcementAction: EventEmitter<Object> = new EventEmitter<Object>();
public tinyInit: Object;
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
  onSave() {
    const updtAncmnt = {
      announcementId: this.announcement.announcementId,
      title: this.title,
      content: this.content,
      postedBy: this.announcement.postedBy,
      postedDate: this.announcement.postedDate,
      updatedBy: null,
      updatedDate: new Date()
    };
    this.announcementAction.emit({'action': AnnouncementActions.put, 'ancmnt': updtAncmnt});
  }
  onCancel() {
    this.announcementAction.emit({'action': AnnouncementActions.cancelEdit, 'ancmnt': undefined});
  }
  resetForm() {
    this.title = null;
    this.content = null;
  }
}
