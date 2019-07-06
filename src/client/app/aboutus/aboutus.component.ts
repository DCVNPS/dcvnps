import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Photo } from '../shared/photo.model';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../shared/person.model';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {
  public photos: Photo[] = [];
  public chair: Person;
  public viceChair: Person;
  public generalSec: Person;
  public treasury: Person;
  public auditor: Person;
  public bodyText: string;
  public showDialog: boolean;
  constructor(private router: ActivatedRoute, private location: Location) {
    this.showDialog = false;
    this.chair = { firstName: 'Dung', lastName: 'Do', middleName: 'Linh', tittle: 'chairman' };
    this.viceChair = { firstName: 'Dinh', lastName: 'Tran', middleName: 'Thuy', tittle: 'vice chairman' };
    this.generalSec = { lastName: 'Nguyen', firstName: 'Lan', middleName: 'Kieu', tittle: 'general secretary' };
    this.treasury = { lastName: 'Hoang', firstName: 'Ly', middleName: 'Truc', tittle: 'treasury' };
    this.auditor = { lastName: 'Long', firstName: 'Vuong', middleName: '', tittle: 'auditor' };
  }

  ngOnInit() {
    const data = this.router.snapshot.data['photos'];
    data.forEach((yearData) => {
      yearData.authorData.forEach(authorPhotos => {
        authorPhotos.photos.forEach(photo => {
          this.photos.push(new Photo(
            photo.photoId,
            photo.galleryId,
            photo.gallery,
            photo.imgalt,
            photo.imgsrc,
            photo.portrait === 1,
            true
          ));
        })
      })
    });
    // console.log(this.photos);
  }
  showPopup(sIndex: number) {
    this.photos.forEach(s => s.hidden = true);
    this.photos[sIndex].hidden = false;
    this.showDialog = true;
  }

  goBack() {
    this.location.back();
  }
}
