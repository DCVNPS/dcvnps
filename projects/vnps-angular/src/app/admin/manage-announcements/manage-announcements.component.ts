import { Component, OnInit, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { Announcement } from '../../shared/models/interfaces';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../api/services/api.service';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'vnps-manage-announcements',
  templateUrl: './manage-announcements.component.html',
  styleUrls: ['./manage-announcements.component.css']
})
export class ManageAnnouncementsComponent implements OnInit {

  announcements: Array<Announcement>;
  deletedAnnouncement: Announcement;
  showDialog = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiService,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData() {
    this.announcements = this.route.snapshot.data.announcements;
    // console.log(this.announcements);
    this.deletedAnnouncement = this.announcements[0];
  }

  get siteAdmin(): boolean {
    return this.auth.siteAdmin;
  }

  get isAdmin(): boolean {
    return this.auth.isAdmin;
  }
  onDeleteAnnouncement(id: string): void {
    this.deletedAnnouncement = this.announcements.filter( a => a.announcementId === id)[0];
    this.showDialog = true;
  }

  onAcceptDenyDelete(accept: boolean) {
    this.showDialog = false;
    if (accept) {
      // alert(`Annoucement: <${this.deletedAnnouncement.title}> deleted.`);
      this.api.delete(`announcements/${this.deletedAnnouncement.announcementId}`)
        .subscribe((failed) => {
          if (!!failed) {
            const delIndex = this.announcements.indexOf(this.deletedAnnouncement);
            this.announcements.splice(delIndex, 1);
          }
        });
    }
  }

}
