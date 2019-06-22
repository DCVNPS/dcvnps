import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Slide } from '../shared/slide.model';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {
  level: string;
  year: string;
  years: Array<string>;
  private selectedSlides: Array<Slide>;
  slides: Array<Slide>;
  showDialog = false;
  public destroyed = new Subject<any>();
  constructor(private route: ActivatedRoute, private router: Router) { 
    this.initializeData();
  }

  ngOnInit() {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      takeUntil(this.destroyed)
    ).subscribe(() => {
      this.initializeData();
    })
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  initializeData() {
    this.years = [];
    this.slides = [];
    this.selectedSlides = [];
    this.level = this.route.snapshot.paramMap.get('level');
    const galleryData = this.route.snapshot.data;
    // console.log(galleryData);
    let cnt = 0;
    galleryData.data.forEach((item) => {
      this.years.push(item.year);
      item.photos.forEach((photo) => {
        this.selectedSlides.push(new Slide(photo.galleryPhotoId,
          photo.galleryId,
          item.year,
          'dummy note',
          cnt,
          `/galleries/${photo.gallery}/${item.year}/${photo.photoImg}`,
          `${photo.photoImg.replace(/\.jpg$|\.bmp$/i, '')}`,
          item.portrait === 1,
          true));

        cnt += 1;
      });
    });
    this.slides = this.selectedSlides;
    // console.log(this.slides);
  }
  onFilterYear(year: string) {
    let cnt = 0;
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
