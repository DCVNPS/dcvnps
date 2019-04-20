import { Component, OnInit } from '@angular/core';
import { Gallery } from '../shared/gallery.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-galleries',
  templateUrl: './galleries.component.html',
  styleUrls: ['./galleries.component.scss']
})
export class GalleriesComponent implements OnInit {
  public _galleries: Gallery[] = [];
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.get('/galleries')
      .subscribe(data => {
        data.forEach(item => {
          this._galleries.push(new Gallery(
            item._id,
            item.gallery,
            item.year,
            `profiles/${item.gallery}/${item.year}/${item.profilePhoto}`,
            item.createDate,
            item.updateDate))
        });
        console.log(this._galleries);
      });
    }

}
