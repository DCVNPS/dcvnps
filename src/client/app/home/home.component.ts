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
  public photos: Array<Photo> = [];
  public galleries: Array<Gallery> = [];
  public carouseConfig: Object = { 'delay': 3000, 'showIndicator': true, 'runSlideShow': true };
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const data = this.route.snapshot.data['photos'];
    this.galleries = this.route.snapshot.data['galleries'];
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
