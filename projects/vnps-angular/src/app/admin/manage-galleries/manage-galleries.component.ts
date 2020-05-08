import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { ApiService } from '../../api/services/api.service';
import { Gallery } from '../../shared/models/interfaces';
import { AuthService } from '../../auth/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'vnps-manage-galleries',
  templateUrl: './manage-galleries.component.html',
  styleUrls: ['./manage-galleries.component.css']
})
export class ManageGalleriesComponent implements OnInit, OnDestroy {

  showDeleteConfirmDialog = false;
  forDelGallery: Gallery;
  galleries: Gallery[] = [];

  private destroyed = new Subject<any>();
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private api: ApiService,
    private auth: AuthService
  ) {
    this.initData();
   }

  siteAdmin(): boolean {
    return this.auth.siteAdmin;
  }

  levelAdmin(level: string): boolean {
    return this.auth.levelAdmin(level);
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
    console.log(this.auth.adminLevel);
    if (this.auth.siteAdmin) {
      this.galleries = this.route.snapshot.data.galleries;
    } else {
      const galleries = this.route.snapshot.data.galleries;
      this.galleries = galleries.filter( (g: Gallery) => g.gallery === this.auth.adminLevel?.level);
    }
    // console.log(this.galleries);
    this.showDeleteConfirmDialog = false;
    this.forDelGallery = this.galleries[0];
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  galleryImageSource(g: Gallery): string {
    return `galleries/${g.gallery.replace(' ', '_')}/profile/${g.profilePhoto}`;
  }

  onDeleteGallery(gallery: Gallery) {
    this.forDelGallery = gallery;
    this.showDeleteConfirmDialog = true;
  }

  onAcceptDenyDelete(accept: boolean) {
    this.showDeleteConfirmDialog = false;
    if ( accept ) {
      // call database server to remove gallery.
      this.deleteGallery(this.forDelGallery);
    }
  }

  private deleteGallery(g: Gallery): void {
    // console.log(g);
    this.api.delete('galleries', {galleryId: g.galleryId, gallery: g.gallery, galImgSrc: this.galleryImageSource(g)})
    .subscribe( delStat => {
      if (!!delStat) {
        const delIndx = this.galleries.indexOf(this.forDelGallery);
        this.galleries.splice(delIndx, 1);
        this.forDelGallery =  {galleryId: '123', gallery: 'dummy'};
      }
    });
  }
}
