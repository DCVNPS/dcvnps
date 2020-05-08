import { Component, OnInit } from '@angular/core';
import { Gallery } from '../../shared/models/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'vnps-gallery-list',
  templateUrl: './gallery-list.component.html',
  styleUrls: ['./gallery-list.component.css']
})
export class GalleryListComponent implements OnInit {

  galleries: Array<Gallery> = [];
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.galleries = this.route.snapshot.data.galleries;
  }

  galleryImageSource(g: Gallery): string {
    return `galleries/${g.gallery.replace(' ', '_')}/profile/${g.profilePhoto}`;
  }

}
