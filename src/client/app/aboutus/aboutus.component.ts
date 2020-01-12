import { Component, OnInit } from '@angular/core';
import { Photo } from '../models/photo.model';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../models/person.model';
import { BoardMember } from '../models/board-member';

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
  public boardMembers: Array<BoardMember> = [];
  constructor(private router: ActivatedRoute) {
    this.showDialog = false;
  }

  ngOnInit() {
    this.boardMembers = this.router.snapshot.data['board'];
    // this.boardMembers.forEach(m => { console.log(m); });
    this.chair = this.boardMembers.find( m => m.tittle === 'chairman');
    this.viceChair = this.boardMembers.find( m => m.tittle === 'vice chairman');
    this.generalSec = this.boardMembers.find( m => m.tittle === 'general secretary');
    this.treasury = this.boardMembers.find( m => m.tittle === 'treasury');
    this.auditor = this.boardMembers.find( m => m.tittle === 'auditor');

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
}
