import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Gallery } from '../shared/gallery.model';
import { ApiService } from '../services/api.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.scss']
})
export class GalleriesComponent {
  public galleries: Gallery[] = [];
  public isAdmin: boolean;
  constructor(private api: ApiService, private auth: AuthService, private location: Location) {
    this.api.get('/galleries')
      .subscribe(data => {
        data.forEach(item => {
          const g = this.galleries.find(i => i.gallery === item.gallery);
          if (!g && item.gallery !== 'home' && item.gallery !== 'aboutus') {
            this.galleries.push(new Gallery(
              item._id,
              item.gallery,
              `galleries/${item.gallery}/profile/${item.profilePhoto}`,
              item.createdDate,
              item.updatedDate))
          }
        });
        // console.log(this.galleries);
      });
      this.isAdmin = this.auth.siteAdmin();
  }

  goBack() {
    this.location.back();
  }

}

