import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-manage-site',
  templateUrl: './manage-site.component.html',
  styleUrls: ['./manage-site.component.scss']
})
export class ManageSiteComponent implements OnInit {

  public isPhotoUpload: boolean;
  constructor(private location: Location) { }

  ngOnInit() {
    this.isPhotoUpload = true;
  }
  goBack() {
    this.location.back();
  }

}
