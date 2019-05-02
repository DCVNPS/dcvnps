import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../shared/api.service';
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
    this.years = [];
    this.slides = [];
    this.selectedSlides = [];
    this.route.params.subscribe(params => {
      this.level = params['level'];
      // this.year = params['year'];
      if (this.level) {
        this.api.get(`/galleryphotosbyname/${this.level}`)
          .subscribe(data => {
            let cnt = 0;
            data.forEach(item => {
              this.selectedSlides.push(new Slide(item._id,
                item.galleryId,
                item.year,
                'dummy note',
                cnt++,
                `galleries/${item.gallery}/${item.year}/${item.photo}`,
                `${item.photo.replace(/\.jpg$|\.bmp$/i, '')}`,
                item.portrait,
                true));
              if (this.years.indexOf(item.year) < 0) {
                this.years.push(item.year);
              }
            });
            this.slides = this.selectedSlides;
          });
      }
    });
  }

  ngOnInit() {
  }

  onFilterYear(year: string) {
    let cnt: number = 0;
    // console.log('selected slides',this.selectedSlides);
    if(year){
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
