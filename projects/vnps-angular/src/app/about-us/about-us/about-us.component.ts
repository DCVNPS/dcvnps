import { Component, OnInit } from '@angular/core';
import { Photo, BoardMember } from '../../shared/models/interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'vnps-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  public photos: Photo[] = [];
  public chair: BoardMember;
  public viceChair: BoardMember;
  public generalSec: BoardMember;
  public treasury: BoardMember;
  public auditor: BoardMember;
  public bodyText: string;
  public showDialog: boolean;
  public boardMembers: Array<BoardMember> = [];

  constructor(private router: ActivatedRoute) {
    this.showDialog = false;
  }

  ngOnInit() {
    this.boardMembers = this.router.snapshot.data.board;
    // this.boardMembers.forEach(m => { console.log(m); });
    this.chair = this.getMember('chairman');
    this.viceChair = this.getMember('vice chairman');
    this.generalSec = this.getMember('general secretary');
    this.treasury = this.getMember('treasury');
    this.auditor = this.getMember('auditor');

    this.photos = this.router.snapshot.data.photos;
  }
  showPopup(sIndex: number) {
    this.photos.forEach(s => s.hidden = true);
    this.photos[sIndex].hidden = false;
    this.showDialog = true;
  }
  getMember(title: string): BoardMember {
    const member = this.boardMembers.find( m => m.tittle === title);
    const dummyMember: BoardMember = { lastName: 'unknown', firstName: 'unknown', middleName: 'unknown', tittle: 'unknown'};
    return member ? member : dummyMember;
  }
}
