import { Component, OnInit } from '@angular/core';
import { Slide } from '../shared/slide.model';
import { ApiService } from '../shared/api.service';
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
  constructor(private api: ApiService,
    private router: ActivatedRoute) {
    this.showDialog = false;
    this.api.get('/galleryphotosbyname/about')
      .subscribe(data => {
        let cnt = 0;
        data.forEach(item => {
          this.slides.push(new Slide(item._id,
            item.galleryId,
            item.year,
            'dummy note',
            cnt,
            `galleries/site/${item.gallery}/${item.photo}`,
            `${item.photo.replace(/\.jpg$|\.bmp$/i, '')}`,
            item.portrait,
            true));
        });
        console.log(this.slides);
        this.slides.forEach(s => s.photoIndex = cnt++);
      });
    this.chair = { firstName: 'Dung', lastName: 'Do', middleName: 'Linh' , tittle: 'chairman' };
    this.viceChair = { firstName: 'Dinh', lastName: 'Tran', middleName: 'Thuy', tittle: 'vice chairman' };
    this.generalSec = { lastName: 'Nguyen', firstName: 'Lan', middleName: 'Kieu', tittle: 'general secretary' };
    this.treasury = { lastName: 'Hoang', firstName: 'Ly', middleName: 'Truc', tittle: 'treasury' };
    this.auditor = { lastName: 'Long', firstName: 'Vuong', middleName: '' , tittle: 'auditor' };
  }

  ngOnInit() {
  }
  showPopup(sIndex: number) {
    const currentSlide = this.slides.find(s => s.photoIndex === sIndex);
    if (currentSlide) {
      this.showDialog = true;
      this.slides.forEach(s => s.hidden = true);
      currentSlide.hidden = false;
    }
  }
}
