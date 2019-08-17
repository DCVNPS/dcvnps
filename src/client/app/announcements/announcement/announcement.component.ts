import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Announcement } from '../../models/announcement-model';

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
    this.announcementAction.emit({'action': 'edit', 'ancmnt': this.announcement});
  }

  deleteAnnouncement()  {
    this.announcementAction.emit({'action': 'delete', 'ancmnt': this.announcement});
  }
}
