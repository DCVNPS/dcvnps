import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd, RouterState } from '@angular/router';
import { Photo } from '../models/photo.model';
import { YearData } from '../models/year.data';
import { Subject, Observable } from 'rxjs';
import { filter, takeUntil, map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';
import { AuthorData } from '../models/author.data.model';
import { Gallery } from '../models/gallery.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, OnDestroy {
  // level: string;
  year: string;
  years: Array<string>;
  photos: Array<Photo>;
  showDialog = false;
  private state$: Observable<Gallery>;
  public currentGallery: Gallery;
  public isAdmin: boolean;
  private editUrl: string;
  public galleryData: Array<AuthorData> = [];
  public authPhotos: Array<AuthorData> = [];
  private destroyed = new Subject<any>();
  /******************************************************************
   *  @route: ActivatedRoute is used to retrieve resolve data
   *  @router: Router is used to retrigger navigation on the same Url
  *******************************************************************/
  constructor(private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private api: ApiService) {
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
    // get the galleryid value from the route parameter
    this.state$ = this.route.paramMap.pipe(map(() => window.history.state));
    this.state$.subscribe( data => { this.currentGallery = data; });
    this.isAdmin = this.auth.isAdmin(this.currentGallery.gallery) || this.auth.siteAdmin();
    this.getGalleryData(this.currentGallery.galleryId);
  }

  onFilterYear(year: string) {
    this.authPhotos = [];
    // console.log({'current Data': this.galleryData});
    if (year) {
      this.galleryData.forEach( gd =>{
        if( gd.year === year){
          this.authPhotos.push(gd);
        }
      })
    } else {
      this.authPhotos = this.galleryData;
    }
    // console.log(this.authPhotos);
  }

  showPopup(event) {
    this.photos = event;
    this.showDialog = true;
  }

  getGalleryData(galleryid: string) {
    const apiEnpoint: string = `galleryphotos/galleryid/${galleryid}`;
    this.api.get(apiEnpoint).subscribe(
      data => {
        // console.log(data);
        data.forEach(yearData => {
          this.years.push(yearData.year);
          yearData.authorData.forEach(authData => {
            this.authPhotos.push(authData);
          })
        });
        this.galleryData = this.authPhotos;
        // console.log(this.authPhotos);
      })
  }
}
