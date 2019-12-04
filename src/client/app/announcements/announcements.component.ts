import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Announcement } from '../models/announcement-model';
import { ApiService } from '../services/api.service';
import { AnnouncementActions } from '../models/dcnpsn-enum';

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
      }, error => {
        console.log(error);
      });
  }
  siteAdmin() {
    return this.auth.siteAdmin();
  }
  editAnnouncements() {
    this.editAncmnts = true;
    this.addAncmnt = this.addAncmnt ? !this.addAncmnt : this.addAncmnt;
  }
  finishEditAnnouncements() {
    this.editAncmnts = false;
    this.addAncmnt = false;
    this.editAncmnt = false;
  }

  addAnnouncement() {
    this.addAncmnt = true;
  }

  // onAddAncmntEvent(event) {
  //   console.log(event);
  //   if (event) {
  //     // Add the Announcement to the top of the list
  //     this.announcements.unshift(event);
  //   }
  //   this.addAncmnt = false;
  // }

  onAnnouncementAction(event) {
    const { action, ancmnt } = event;
    switch (action) {
      case AnnouncementActions.edit:
        // Prepare Announcement for editing
        this.initEditAncmnt = ancmnt;
        this.editAncmnt = true;
        window.scroll(0, 0);
        break;
      case AnnouncementActions.cancelEdit:
        this.editAncmnt = false;
        break;
      case AnnouncementActions.cancelNew:
        this.addAncmnt = false;
        break;
      case AnnouncementActions.post:
        console.log('inserting new announcement...');
        this.api.post('announcements', ancmnt)
          .subscribe(data => {
            // console.log(data);
            this.announcements.unshift(data);
            // console.log(this.announcements);
            this.addAncmnt = false;
          },
            error => {
              console.log(error);
            });
        break;
      case AnnouncementActions.put:
        console.log(`saving announcement ${ancmnt.announcementId}...`);
        if (ancmnt) {
          this.api.put('announcements', ancmnt)
            .subscribe( result => {
              // console.log(result);
              const curAncmnt = this.announcements.find(a => a.announcementId === result.announcementId);
              const indx = this.announcements.indexOf(curAncmnt);
              this.announcements.splice(indx, 1, result);
              this.editAncmnt = false;
            },
            error => {
              console.log(error);
            });
        }
        break;
      case AnnouncementActions.delete:
        // console.log(ancmnt);
        this.api.delete(`announcements/${ancmnt.announcementId}`)
          .subscribe(result => {
            // Successful delete, remove from announcement list
            console.log(`Announcement ${ancmnt.announcementId} deleted.`);
            const indx = this.announcements.indexOf(ancmnt);
            this.announcements.splice(indx, 1);
          },
            error => {
              console.log(error);
            });
        break;
      default:
        break;
    }
  }
}
