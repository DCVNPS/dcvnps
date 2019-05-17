import { Component, OnInit } from '@angular/core';
import { ApiService } from '../shared/api.service';
import { Slide } from '../shared/slide.model';
import { Gallery } from '../shared/gallery.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public slides: Array<Slide> = [];
  public galleries: Array<Gallery> = [];
  constructor(private api: ApiService) {
    this.getHomePhotos();
    this.getGalleries();
   }

  ngOnInit() {
    // this.getHomePhotos();
    // this.getGalleries();
  }
  
  getHomePhotos(){
    this.api.get('galleryphotosbyname/home')
    .subscribe(data => {
      console.log(data);
      let cnt = 0;
      data.forEach((item) => {
        item.photos.forEach((photo) => {
          // console.log(`year: ${item.year} -- photoUrl: ${photo.photoUrl} -- portrait:${photo.portrait}`);
          if (photo.portrait !== 1) {
            this.slides.push(new Slide(photo.galleryPhotoId,
              photo.galleryId,
              item.year,
              'dummy note',
              cnt,
              `/galleries/${photo.gallery}/${item.year}/${photo.photoImg}`,
              `${photo.photoImg.replace(/\.jpg$|\.bmp$/i, '')}`,
              item.portrait === 1,
              true));
          }
          cnt += 1;
        });
      });
      console.log(this.slides);
    });
  }
  getGalleries(){
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
              item.updatedDate));
          }
        });
        // console.log(this.galleries);
      });    
  }
}
