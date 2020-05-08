import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Announcements } from '../../shared/models/interfaces';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'vnps-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
  announcements: Announcements;
  constructor( private route: ActivatedRoute, private auth: AuthService) { }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData() {
    this.announcements = this.route.snapshot.data.announcements;
    // console.log(this.announcements);
  }
}
