import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Slide } from '../shared/slide.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  level: string;
  year: string;
  years: Array<string>;
  private selectedSlides: Array<Slide>;
  slides: Array<Slide>;
  showDialog = false;
  constructor(
    private api: ApiService,
    private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.level = params['level'];
      this.years = [];
      this.slides = [];
      this.selectedSlides = [];
      this.api.get(`/galleryphotosbyname/${this.level}`)
        .subscribe(data => {
          let cnt = 0;
          data.forEach((item) => {
            this.years.push(item.year);
            item.photos.forEach((photo) => {
              // console.log(`year: ${item.year} -- photoUrl: ${photo.photoUrl} -- portrait:${photo.portrait}`);
              if (photo.portrait !== 1) {
                this.selectedSlides.push(new Slide(photo.galleryPhotoId,
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
        });
      this.slides = this.selectedSlides;
      console.log(this.selectedSlides);
    });
  }

  ngOnInit() {
  }

  onFilterYear(year: string) {
    let cnt: number = 0;
    // console.log('selected slides',this.selectedSlides);
    if (year) {
      this.slides = this.selectedSlides.filter(s => s.year === year);
    } else {
      this.slides = this.selectedSlides;
    }
    this.slides.forEach(s => s.photoIndex = cnt++);
  }

  showPopup(sIndex: number) {
    const currentSlide = this.slides.find(s => s.photoIndex === sIndex);
    if (currentSlide) {
      this.showDialog = true;
      this.slides.forEach(s => s.hidden = true);
      currentSlide.hidden = false;
    }
  }
}
