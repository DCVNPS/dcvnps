import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Slide } from '../shared/slide.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public slides: Slide[] = [];
  constructor(private api: ApiService) { }

  ngOnInit() {
    this.api.get('/galleryphotosbyname/home')
      .subscribe(data => {
        let cnt = 0;
        data.forEach(item => {
          this.slides.push(new Slide(item._id,
            item.galleryId,
            'dummy note',
            cnt,
            `galleries/${item.gallery}/${item.year}/${item.photo}`,
            `${item.photo.replace(/\.jpg$|\.bmp$/i, '')}`,
            item.portrait,
            true));
          cnt += 1;
        });
        console.log(this.slides);
      })
  }

}
