import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Slide } from '../shared/slide.model';
import { ActivatedRoute } from '@angular/router';
import { Person } from '../shared/person.model';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {
  public slides: Slide[] = [];
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
    this.slides = this.router.snapshot.data['photos'];
  }
  showPopup(sIndex: number) {
    const currentSlide = this.slides.find(s => s.photoIndex === sIndex);
    if (currentSlide) {
      this.showDialog = true;
      this.slides.forEach(s => s.hidden = true);
      currentSlide.hidden = false;
    }
  }

  goBack() {
    this.location.back();
  }
}
