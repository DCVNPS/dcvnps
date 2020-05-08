import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, RouterEvent, NavigationEnd } from '@angular/router';
import { ApiService } from '../../../api/services/api.service';
import { AuthService } from '../../../auth/services/auth.service';
import { DzImagesService } from '../../../shared/dropzone/dz-images.service';
import { GalleryDataService } from '../../services/gallery-data.services';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Gallery, DropzoneConfig } from '../../../shared/models/interfaces';

@Component({
  selector: 'vnps-gallery-upload-photo',
  templateUrl: './gallery-upload-photo.component.html',
  styleUrls: ['./gallery-upload-photo.component.css']
})
export class GalleryUploadPhotoComponent implements OnInit, OnDestroy {

  private destroyed = new Subject<any>();
  galleryId: string;
  dzconfig: DropzoneConfig;
  gallery: Gallery | undefined;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
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

  async initData() {
    console.log(this.activatedRoute.parent);
    this.galleryId = this.activatedRoute.parent?.snapshot.params.id;
    console.log(this.galleryId);
    this.gallery = await this.galleryDataService.Galleries.find((g: Gallery) => g.galleryId === this.galleryId);
    console.log(this.gallery);
    this.dzconfig = {
      galleryId: this.galleryId,
      gallery: this.gallery?.gallery,
      year: ''
    };
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  onClose() {
    this.router.navigate(['../photos'], {relativeTo: this.activatedRoute});
  }
}
