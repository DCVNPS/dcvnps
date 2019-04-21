import { Component, OnInit } from '@angular/core';
import { Slide } from '../shared/slide.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {
  public slides: Slide[] = [];
  public bodyText: string;
  constructor(private api: ApiService) {
    this.api.get('/galleryphotosbyname/about')
      .subscribe(data => {
        let cnt = 0;
        data.forEach(item => {
          this.slides.push(new Slide(item._id,
            item.galleryId,
            'dummy note',
            cnt,
            `galleries/site/${item.gallery}/${item.photo}`,
            `${item.photo.replace(/\.jpg$|\.bmp$/i, '')}`,
            item.portrait,
            true));
          cnt += 1;
        });
        console.log(this.slides);
      });
  }

  ngOnInit() {
  }
}
