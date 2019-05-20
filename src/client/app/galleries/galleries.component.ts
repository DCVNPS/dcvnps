import { Component, OnInit } from '@angular/core';
import { Gallery } from '../shared/gallery.model';
import { ApiService } from '../services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.scss']
})
export class GalleriesComponent implements OnInit {
  public galleries: Gallery[] = [];
  constructor(private api: ApiService) {
    this.api.get('/galleries')
      .subscribe(data => {
        data.forEach(item => {
          const g = this.galleries.find(i => i.gallery === item.gallery);
          if (!g && item.gallery !== 'home' && item.gallery !== 'about') {
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
  }

  ngOnInit() {
  }
}

