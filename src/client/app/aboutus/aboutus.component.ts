import { Component, OnInit } from '@angular/core';
import { Slide } from '../shared/slide.model';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {
  public slides: Slide[] = [];
  public chair: {};
  public viceChair: {};
  public generalSec: {};
  public treasury: {};
  public auditor: {};
  public bodyText: string;
  constructor(private api: ApiService) {
    this.api.get('/galleryphotosbyname/about')
      .subscribe(data => {
        let cnt = 0;
        data.forEach(item => {
          this.slides.push(new Slide(item._id,
            item.galleryId,
            'dummy note',
            cnt,
            `galleries/site/${item.gallery}/${item.photo}`,
            `${item.photo.replace(/\.jpg$|\.bmp$/i, '')}`,
            item.portrait,
            true));
          cnt += 1;
        });
        console.log(this.slides);
      });
      this.chair =  {name:{last:'Do', first:'Dung', middle:'Linh'}, rank:'chairman'};
      this.viceChair = {name:{last:'Tran', first:'Dinh', middle:'Thuy'}, rank:'vice chairman'};
      this.generalSec =  {name:{last:'Nguyen', first:'Lan', middle:'Kieu'}, rank:'general secretary'};
      this.treasury =  {name:{last:'Hoang', first:'Ly', middle:'Truc'}, rank:'treasury'};
      this.auditor =  {name:{last:'Long', first:'Vuong', middle:''}, rank:'auditor'};
  }

  ngOnInit() {
  }
}
