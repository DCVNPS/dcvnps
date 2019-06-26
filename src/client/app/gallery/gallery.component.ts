import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Slide } from '../shared/slide.model';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

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
  public isAdmin: boolean;
  public editUrl: string;
  public destroyed = new Subject<any>();
  /******************************************************************
   *  @route: ActivatedRoute is used to retrieve resolve data
   *  @router: Router is used to retrigger navigation on the same Url
  *******************************************************************/
  constructor(private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private location: Location) {
    this.initializeData();
  }

  ngOnInit() {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      takeUntil(this.destroyed)
    ).subscribe(() => {
      this.initializeData();
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  initializeData() {
    this.years = [];
    this.slides = [];
    this.selectedSlides = [];
    // get the gallery name/ level from the route parameter
    this.level = this.route.snapshot.paramMap.get('level');
    this.editUrl = `/editgallery/${this.level}`;
    this.isAdmin = this.auth.isAdmin(this.level) || this.auth.siteAdmin();
    // get the gallery data from route resolver
    const galleryData = this.route.snapshot.data;
    // console.log(galleryData);
    let cnt = 0;
    galleryData.data.forEach((item) => {
      this.years.push(item.year);
      item.photos.forEach((photo) => {
        this.selectedSlides.push(new Slide(photo.galleryPhotoId,
          photo.galleryId,
          item.year,
          photo.author,
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

  goBack() {
    this.location.back();
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
