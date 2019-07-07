import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Photo } from '../shared/photo.model';
import { YearData } from '../shared/year.data';
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
  // selectedPhotos: Array<Photo>;
  photos: Array<Photo>;
  showDialog = false;
  public isAdmin: boolean;
  public editUrl: string;
  public galleryData: Array<YearData> = [];
  public destroyed = new Subject<any>();
  /******************************************************************
   *  @route: ActivatedRoute is used to retrieve resolve data
   *  @router: Router is used to retrigger navigation on the same Url
  *******************************************************************/
  constructor(private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    // private galleryDataService: GalleryDataService,
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
    this.photos = [];
    // this.selectedPhotos = [];
    this.galleryData = [];
    // get the gallery name/ level from the route parameter
    this.level = this.route.snapshot.paramMap.get('level');
    // this.editUrl = `/editgallery/${this.level}`;
    this.isAdmin = this.auth.isAdmin(this.level) || this.auth.siteAdmin();
    // get the gallery data from route resolver
    this.galleryData = this.route.snapshot.data.galleryData;
    // console.log(this.galleryData);
    this.galleryData.forEach( yearData => {
      this.years.push(yearData.year);
      yearData.authorData.forEach( authData => {
        authData.photos.forEach( p => {
          this.photos.push(p);
        })
      })
    });
    // console.log(this.photos);
    // this.galleryDataService.updateData(this.photos);
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

  showPopup(event) {
    this.photos = event;
    // console.log(this.photos);
    this.showDialog = true;
  }

}
