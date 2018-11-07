import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public photos: Array<any> = []
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.get('/galleryphotosbyname/home')
      .subscribe(data => {
        data.forEach(item => {
          const photo = {
            'id': item._id,
            'galleryId': item.galleryId,
            'imgsrc': `galleries/${item.gallery}/${item.year}/${item.photo}`
          };
          this.photos.push(photo);
        });
        console.log(this.photos);
      })
  }

}
