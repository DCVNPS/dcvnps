import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Gallery } from '../../../shared/models/interfaces';
import { ApiService } from '../../../api/services/api.service';

@Component({
  selector: 'vnps-gallery-edit',
  templateUrl: './gallery-edit.component.html',
  styleUrls: ['./gallery-edit.component.css']
})
export class GalleryEditComponent implements OnInit {

  gallery: Gallery;
  editType = 'Info';
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router  ) { }

  ngOnInit(): void {
    this.gallery = this.activatedRoute.snapshot.data.galleries[0];
    // console.log(this.gallery);
  }

  editInfo() {
    this.editType = 'Gallery Info';
    this.router.navigate(['./info'], {relativeTo: this.activatedRoute});
  }

  editPhoto() {
    this.editType = 'Photos';
    this.router.navigate(['./photos'], {relativeTo: this.activatedRoute});
  }
}
