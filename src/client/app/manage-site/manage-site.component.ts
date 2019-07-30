import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

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
  constructor(private location: Location) { }

  ngOnInit() {
    this.isPhotoUpload = true;
  }
  goBack() {
    this.location.back();
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
