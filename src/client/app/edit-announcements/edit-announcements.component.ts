import { Component, OnInit } from '@angular/core';
import { Announcement } from '../models/announcement-model';

@Component({
  selector: 'app-edit-announcements',
  templateUrl: './edit-announcements.component.html',
  styleUrls: ['./edit-announcements.component.scss']
})
export class EditAnnouncementsComponent implements OnInit {
  public announcements: Array<Announcement> = [];
  constructor() { }

  ngOnInit() {
  }

  onAnnouncementAdded(event) {
    this.announcements.push(event);
    console.log(this.announcements);
  }
}
