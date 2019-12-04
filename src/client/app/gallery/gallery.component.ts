import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Photo } from '../models/photo.model';
import { YearData } from '../models/year.data';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AuthorData } from '../models/author.data.model';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {
  level: string;
  year: string;
  years: Array<string>;
  photos: Array<Photo>;
  showDialog = false;
  public isAdmin: boolean;
  public editUrl: string;
  private galleryData: Array<YearData> = [];
  public authPhotos: Array<AuthorData> = [];
  public destroyed = new Subject<any>();
  /******************************************************************
   *  @route: ActivatedRoute is used to retrieve resolve data
   *  @router: Router is used to retrigger navigation on the same Url
  *******************************************************************/
  constructor(private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService) {
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
    this.galleryData = [];
    this.authPhotos = [];
    // get the gallery name/ level from the route parameter
    this.level = this.route.snapshot.paramMap.get('level');
    this.isAdmin = this.auth.isAdmin(this.level) || this.auth.siteAdmin();
    this.galleryData = this.route.snapshot.data.galleryData;
    this.galleryData.forEach( yearData => {
      this.years.push(yearData.year);
      yearData.authorData.forEach( authData => {
        this.authPhotos.push(authData);
      });
    });
    // console.log(this.authPhotos);
  }

  onFilterYear(year: string) {
    this.galleryData = [];
    this.authPhotos = [];
    const data = this.route.snapshot.data.galleryData;
    if (year) {
      this.galleryData.push(data.find(y => y.year === year));
    } else {
      this.galleryData = data;
    }
    this.galleryData.forEach( yearData => {
      yearData.authorData.forEach( authData => {
        this.authPhotos.push(authData);
        // console.log(this.authPhotos);
      });
    });
    // console.log(this.authPhotos);
  }

  showPopup(event) {
    this.photos = event;
    this.showDialog = true;
  }

}
