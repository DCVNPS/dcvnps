import { Component, OnInit } from '@angular/core';
import { Photo } from '../models/photo.model';
import { ActivatedRoute } from '@angular/router';
import { Gallery } from '../models/gallery.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public showDonate: boolean = false;
  public donateAmount: string;
  public photos: Array<Photo> = [];
  public galleries: Array<Gallery> = [];
  public carouseConfig: Object = { 'delay': 10000, 'showIndicator': true, 'runSlideShow': true };
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const data = this.route.snapshot.data['photos'];
    this.galleries = this.route.snapshot.data['galleries'];
    if (Object.keys(data).length > 0) {
      data.forEach((yearData) => {
        yearData.authorData.forEach(authorPhotos => {
          authorPhotos.photos.forEach(photo => {
            this.photos.push(new Photo(
              photo.photoId,
              photo.galleryId,
              photo.gallery,
              photo.imgalt,
              photo.imgsrc,
              photo.portrait === 1,
              true
            ));
          })
        })
      });
      // console.log(this.photos);
    }
  }
  onDonate() {
    this.showDonate = true;
  }
  onCancelDonate() {
    this.showDonate = false;
  }
}
