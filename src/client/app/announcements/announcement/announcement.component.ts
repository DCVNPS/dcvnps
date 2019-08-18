import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Announcement } from '../../models/announcement-model';
import { AnnouncementActions } from '../../models/dcnpsn-enum';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss']
})
export class AnnouncementComponent implements OnInit {
@Input() announcement: Announcement;
@Input() isEdit: boolean;
@Output() announcementAction: EventEmitter<Object> = new EventEmitter<Object>();
  constructor() { }

  ngOnInit() {
  }
  editAnnouncement() {
    this.announcementAction.emit({'action': AnnouncementActions.edit, 'ancmnt': this.announcement});
  }

  deleteAnnouncement()  {
    this.announcementAction.emit({'action': AnnouncementActions.delete, 'ancmnt': this.announcement});
  }
}
