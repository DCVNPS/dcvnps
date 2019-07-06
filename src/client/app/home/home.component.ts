import { Component, OnInit } from '@angular/core';
import { Slide } from '../shared/slide.model';
import { ActivatedRoute } from '@angular/router';
import { Gallery } from '../shared/gallery.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public slides: Array<Slide> = [];
  public galleries: Array<Gallery> = [];
  public carouseConfig: Object = { 'delay': 3000, 'showIndicator': true, 'runSlideShow': true };
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    const data = this.route.snapshot.data['photos'];
    this.galleries = this.route.snapshot.data['galleries'];
    // console.log(data);
    data.forEach((item) => {
        item.yeardata.forEach(ydt => {
            ydt.photos.forEach(photo => {
                this.slides.push(new Slide(
                    photo.galleryPhotoId,
                    photo.galleryId,
                    photo.gallery,
                    item.year,
                    ydt.author,
                    photo.imgsrc,
                    photo.imgalt,
                    photo.portrait === 1,
                    true
                ));
            })
        })
    });
  }
}
