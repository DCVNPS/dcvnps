import { Component, OnInit, OnDestroy } from '@angular/core';
import { GalleryData, AuthorPhotos, Photo, DropzoneConfig, Gallery } from '../../../shared/models/interfaces';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { ApiService } from '../../../api/services/api.service';
import { Subject, Observable, of } from 'rxjs';
import { filter, takeUntil, map } from 'rxjs/operators';
import { AuthService } from '../../../auth/services/auth.service';
import { GalleryDataService } from '../../services/gallery-data.services';
import { DzImagesService } from '../../../shared/dropzone/dz-images.service';

@Component({
  selector: 'vnps-gallery-edit-photos',
  templateUrl: './gallery-edit-photos.component.html',
  styleUrls: ['./gallery-edit-photos.component.css']
})
export class GalleryEditPhotosComponent implements OnInit, OnDestroy {

  private destroyed = new Subject<any>();
  year: string;
  years: Array<string> = [];
  photos: Array<Photo>;
  galleryId: string;
  gallery: Gallery | undefined;
  showUpload = false;
  enablePopup = true;
  galleryData: GalleryData;
  // the authPhotos is used on the template after filter by the year.
  authorPhotos: Array<AuthorPhotos> = [];
  author: Array<string>;
  showDialog: boolean;

constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private auth: AuthService,
    private galleryDataService: GalleryDataService
  ) {
    this.initData();
   }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd ),
      takeUntil( this.destroyed)
    ).subscribe( () => {
      this.initData();
    });
  }

  initData() {
    this.galleryId = this.activatedRoute.parent?.snapshot.params.id;
    this.getGallery();
    this.getGalleryPhotos();
    // console.log(this.gallery);
  }

  getGallery() {
    const apiUrl = 'galleries/' + this.galleryId;
    this.api.get(apiUrl)
    .subscribe( (data: Array<Gallery>) => this.gallery = data[0]);
  }

  getGalleryPhotos() {
    const apiUrl = `galleryphotos/${this.galleryId}`;
    this.api.get(apiUrl)
    .subscribe( data => {
        data.forEach( (yearData: any) => {
          this.years.push(yearData.year);
          yearData.authorData.forEach( (authPhotos: AuthorPhotos) => {
            this.authorPhotos.push(authPhotos);
          });
        });
        this.galleryData = { years: this.years, authorData: this.authorPhotos };
      });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  get isAdmin(): boolean {
    return this.auth.isAdmin;
  }

  onFilterYear(year?: string) {
    this.authorPhotos = [];
    if (year) {
      this.galleryData.authorData.forEach(authPhoto => {
        if (authPhoto.year === year) {
          this.authorPhotos.push(authPhoto);
        }
      });
    } else {
      this.authorPhotos = this.galleryData.authorData;
    }
    // console.log(this.filteredAuthorPhotos);
  }

  showPopup(event: Array<Photo>) {
    this.photos = event;
    this.showDialog = true;
  }

  uploadPhoto() {
    this.router.navigate(['../upload'], {relativeTo: this.activatedRoute});
  }

  onDeletePhoto(event: AuthorPhotos) {
    // const authorphotos = event as AuthorPhotos;
    const { author, year, gallery, photos } = event as AuthorPhotos;
    // console.log({ author, year, gallery, photos });
    const authorPhotos = this.galleryData.authorData.find( ap => ap.author === author && ap.year === year);
    if (authorPhotos) {
      // console.log(authorPhotos);
      const formData = new FormData();
      formData.append('photoId', photos[0].photoId);
      formData.append('imgsrc', photos[0].imgsrc);
      this.api.delete('galleryphotos', formData)
      .subscribe( (success) => {
        if (!!success) {
          const delIndx  = authorPhotos.photos.indexOf(photos[0]);
          authorPhotos.photos.splice(delIndx, 1);
          window.alert(`photo ${photos[0].imgalt} deleted.`);
        }
      });
    }
  }
}
