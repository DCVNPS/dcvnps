import { Component, OnInit } from '@angular/core';
import { Photo, Gallery } from '../../shared/models/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'vnps-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public showDonate = false;
  public donateAmount: string;
  public photos: Array<Photo> = [];
  public galleries: Array<Gallery> = [];
  public carouseConfig = { delay: 10000, showIndicator: true, runSlideShow: true };

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.photos = this.route.snapshot.data.photos;
    this.galleries = this.route.snapshot.data.galleries;
    // console.log(this.photos);
  }

  galleryImageSource(g: Gallery): string {
    return `galleries/${g.gallery.replace(' ', '_')}/profile/${g.profilePhoto}`;
  }
  onDonate() {
    this.showDonate = true;
  }
  onCancelDonate() {
    this.showDonate = false;
  }
}
