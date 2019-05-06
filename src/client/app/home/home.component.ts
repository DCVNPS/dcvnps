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
    this.api.get('galleryphotosbyname/home')
      .subscribe(data => {
        console.log(data);
        let cnt = 0;
        data.forEach((item) => {
          item.photos.forEach((photo) => {
            console.log(`year: ${item.year} -- photoUrl: ${photo.photoUrl} -- portrait:${photo.portrait}`);
            if (photo.portrait !== 1) {
              this.slides.push(new Slide(photo.galleryPhotoId,
                photo.galleryId,
                item.year,
                'dummy note',
                cnt,
                photo.photoUrl,
                `${photo.photoUrl.replace(/\.jpg$|\.bmp$/i, '')}`,
                item.portrait,
                true));
            }
            cnt += 1;
          });
        });
        console.log(this.slides);
      });
  }

}
