import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Announcement } from '../models/announcement-model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {
  public announcements: Array<Announcement> = [];
  constructor(private api: ApiService, private auth: AuthService) {  }
  ngOnInit() {
    const apiEndPoint = 'announcements';
    this.api.get(apiEndPoint)
    .subscribe( res => {
      console.log(res);
      res.forEach( ancmnt => {
        this.announcements.push(ancmnt);
      });
    })
  }

  siteAdmin() {
    return this.auth.siteAdmin();
  }
}
