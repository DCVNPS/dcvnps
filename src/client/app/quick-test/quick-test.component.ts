import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Photo } from '../shared/photo.model';
import { Gallery } from '../shared/gallery.model';

@Component({
  selector: 'app-quick-test',
  templateUrl: './quick-test.component.html',
  styleUrls: ['./quick-test.component.scss']
})
export class QuickTestComponent implements OnInit {
  imgSrc = 'profiles/member/2018/member-2018.jpg';
  public popupInput: Photo[] = [];
  public photos: Array<Photo> = [];
  public galleries: Array<Gallery> = [];
  public showDialog: boolean;
  public carouseConfig: Object = { 'delay': 3000, 'showIndicator': true, 'runSlideShow': false };
  constructor(private route: ActivatedRoute) {
    this.popupInput = [new Photo(
      '12345',
      '45678',
      'member',
      'profiles/member/2018/member-2018.jpg',
      'alternative',
      false,
      false)];
  }
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
