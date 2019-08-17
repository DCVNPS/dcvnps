import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Announcement } from '../models/announcement-model';
import { ApiService } from '../services/api.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {
  @Input() isEdit: boolean;
  public announcements: Array<Announcement> = [];
  public editAncmnts = false;
  public editAncmnt = false;
  public addAncmnt = false;
  public initEditAncmnt: Announcement;
  constructor(private api: ApiService, private auth: AuthService, private location: Location) { }
  ngOnInit() {
    this.initData();
  }

  initData() {
    this.editAncmnts = this.isEdit || false;
    const apiEndPoint = 'announcements';
    this.api.get(apiEndPoint)
      .subscribe(res => {
        // console.log(res);
        res.forEach(ancmnt => {
          this.announcements.push(ancmnt);
        });
      });
  }
  siteAdmin() {
    return this.auth.siteAdmin();
  }
  editAnnouncements() {
    this.editAncmnts = true;
    this.addAncmnt = this.addAncmnt ? !this.addAncmnt : this.addAncmnt;
  }
  cancelEditAnnouncements() {
    this.editAncmnts = false;
    this.addAncmnt = false;
    this.editAncmnt = false;
  }

  addAnnouncement() {
    this.addAncmnt = true;
  }

  onAddAncmntEvent(event) {
    console.log(event);
    if (event) {
      // Add the Announcement to the top of the list
      this.announcements.unshift(event);
    }
    this.addAncmnt = false;
  }

  onEditAncmntSaved(event) {
    console.log(event);
    if (event) {
      const curAncmnt = this.announcements.find(a => a.announcementId === event.announcementId);
      const indx = this.announcements.indexOf(curAncmnt);
      this.announcements.splice(indx, 1, event);
    }
    this.editAncmnt = false;
  }

  onAnnouncementAction(event) {
    const { action, ancmnt } = event;
    switch (action) {
      case 'edit':
        // Prepare Announcement for editing
        this.initEditAncmnt = ancmnt;
        this.editAncmnt = true;
        break;
      case 'delete':
        console.log(event);
        this.api.delete(`announcements/${ancmnt.announcementId}`)
        .subscribe( result => {
          // Successful delete, remove from announcement list
          console.log(`Announcement ${ancmnt.announcementId} deleted.`);
          const indx = this.announcements.indexOf(ancmnt);
          this.announcements.splice(indx, 1);
        })
        break;
      default:
        break;
    }
  }
}
