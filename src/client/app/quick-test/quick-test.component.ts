import { Component, OnInit } from '@angular/core';
import { Slide } from '../shared/slide.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-quick-test',
  templateUrl: './quick-test.component.html',
  styleUrls: ['./quick-test.component.scss']
})
export class QuickTestComponent implements OnInit {
  imgSrc = 'profiles/member/2018/member-2018.jpg';
  public popupInput: Slide[] = [];
  public slides: Array<Slide> = [];
  public showDialog: boolean;
  constructor(private api: ApiService) {
    this.popupInput = [new Slide(
      '12345',
      '2017',
      '45678',
      'Testing image',
       1,
      'profiles/member/2018/member-2018.jpg',
      'alternative',
      false,
      false)];
  }
  ngOnInit() {
    this.getHomePhotos();
  }
  getHomePhotos(){
    this.api.get('galleryphotosbyname/home')
    .subscribe(data => {
      let cnt = 0;
      data.forEach((item) => {
        item.photos.forEach(async (photo) => {
          let result = await photo;
          if (photo.portrait !== 1) {
            let imgsrc = `/galleries/${photo.gallery}/${item.year}/${photo.photoImg}`;
            let p = this.slides.find(i => i.imgsrc === imgsrc);
            if(!p){
              this.slides.push(new Slide(photo.galleryPhotoId,
                photo.galleryId,
                item.year,
                'dummy note',
                cnt,
                `/galleries/${photo.gallery}/${item.year}/${photo.photoImg}`,
                `${photo.photoImg.replace(/\.jpg$|\.bmp$/i, '')}`,
                item.portrait === 1,
                true));  
                cnt += 1;
              }
          }
        });
      });
      console.log(this.slides);
    });
  }

}
