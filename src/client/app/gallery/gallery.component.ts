import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Slide } from '../shared/slide.model';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { GalleryDataService } from '../services/gallery-data.service';

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
  public galleryData: Array<any> = [];
  public destroyed = new Subject<any>();
  /******************************************************************
   *  @route: ActivatedRoute is used to retrieve resolve data
   *  @router: Router is used to retrigger navigation on the same Url
  *******************************************************************/
  constructor(private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private galleryDataService: GalleryDataService,
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
    this.galleryData = [];
    // get the gallery name/ level from the route parameter
    this.level = this.route.snapshot.paramMap.get('level');
    this.editUrl = `/editgallery/${this.level}`;
    this.isAdmin = this.auth.isAdmin(this.level) || this.auth.siteAdmin();
    // get the gallery data from route resolver
    this.galleryData = this.route.snapshot.data.galleryData;
    this.galleryData.forEach( yearData => {
      this.years.push(yearData.year);
    });
    this.slides = this.selectedSlides;
    this.galleryDataService.updateData(this.selectedSlides);
    // console.log(this.galleryData);
  }

  goBack() {
    this.location.back();
  }

  onFilterYear(year: string) {
    this.galleryData = [];
    const data = this.route.snapshot.data.galleryData;
    if (year) {
      this.galleryData.push(data.find(y => y.year === year));
    } else {
      this.galleryData = data;
    }
    // console.log(this.galleryData);
  }

  showPopup(sIndex: number) {
    // const currentSlide = this.slides.find(s => s.photoIndex === sIndex);
    // if (currentSlide) {
    //   this.showDialog = true;
    //   this.slides.forEach(s => s.hidden = true);
    //   currentSlide.hidden = false;
    // }
    this.slides.forEach(s => s.hidden = true);
    this.slides[sIndex].hidden = false;
  }
}
