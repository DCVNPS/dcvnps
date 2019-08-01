import { Component } from '@angular/core';
import { Gallery } from '../models/gallery.model';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.scss']
})
export class GalleriesComponent {
  public galleries: Gallery[] = [];
  public isAdmin: boolean;
  constructor(private route: ActivatedRoute, private api: ApiService, private auth: AuthService) {
    this.galleries = this.route.snapshot.data['galleries'];
    this.isAdmin = this.auth.siteAdmin();
  }

}

