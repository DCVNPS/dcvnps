import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl, Validators, FormsModule, FormBuilder, NgForm } from '@angular/forms';

@Component({
  selector: 'app-announcements',
  templateUrl: './announcements.component.html',
  styleUrls: ['./announcements.component.scss']
})
export class AnnouncementsComponent implements OnInit {
  constructor(private auth: AuthService) {  }
  ngOnInit() {
  }

  siteAdmin() {
    return this.auth.siteAdmin();
  }
}
