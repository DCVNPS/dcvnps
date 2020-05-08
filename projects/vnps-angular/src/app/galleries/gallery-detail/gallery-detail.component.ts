import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Photo, AuthorPhotos, GalleryData } from '../../shared/models/interfaces';


@Component({
  selector: 'vnps-gallery-detail',
  templateUrl: './gallery-detail.component.html',
  styleUrls: ['./gallery-detail.component.css']
})
export class GalleryDetailComponent implements OnInit, OnDestroy {

  year: string;
  years: Array<string>;
  photos: Array<Photo>;
  enablePopup = true;
  public isAdmin = false;
  public isUpload = false;
  public dzconfig = {};
  public galleryData: GalleryData;
  // the authPhotos is used on the template after filter by the year.
  public authPhotos: Array<AuthorPhotos> = [];

  galleryName: string;
  private authorPhotos: Array<AuthorPhotos> = [];
  private destroyed = new Subject<any>();
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.initializeData();
  }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      takeUntil(this.destroyed)
    ).subscribe(() => {
      this.initializeData();
    });
  }

  initializeData() {
    this.galleryName = this.route.snapshot.params.gallery;
    this.galleryData = this.route.snapshot.data.galleryData;
    this.years = this.galleryData.years;
    this.authorPhotos = this.galleryData.authorData;
    this.authPhotos = this.authorPhotos;
    // console.log(this.authorPhotos);
  }

  onFilterYear(year: string) {
    this.authPhotos = [];
    // console.log({'current Data': this.galleryData});
    if (year) {
      this.authorPhotos.forEach(authPhoto => {
        if (authPhoto.year === year) {
          this.authPhotos.push(authPhoto);
        }
      });
    } else {
      this.authPhotos = this.authorPhotos;
    }
    // console.log(this.authPhotos);
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

}
