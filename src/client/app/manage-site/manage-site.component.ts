import { Component, OnInit } from '@angular/core';
import { Gallery } from '../models/gallery.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-site',
  templateUrl: './manage-site.component.html',
  styleUrls: ['./manage-site.component.scss']
})
export class ManageSiteComponent implements OnInit {

  public isPhotoUpload: boolean;
  public isGallery: boolean;
  public isPrograms: boolean;
  public isAnnouncements: boolean;
  private galleries: Array<Gallery> = [];
  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.isPhotoUpload = true;
    this.galleries = this.route.snapshot.data['galleries'];
  }

  onUploadClick() {
    this.isPhotoUpload = true;
    this.isGallery = false;
    this.isPrograms = false;
    this.isAnnouncements = false;
  }
  onGalleryClick() {
    this.isPhotoUpload = false;
    this.isGallery = true;
    this.isPrograms = false;
    this.isAnnouncements = false;
  }
  onAnnouncements() {
    this.isPhotoUpload = false;
    this.isGallery = false;
    this.isPrograms = false;
    this.isAnnouncements = true;
  }

  onPrograms() {
    this.isPhotoUpload = false;
    this.isGallery = false;
    this.isPrograms = true;
    this.isAnnouncements = false;
  }

}
