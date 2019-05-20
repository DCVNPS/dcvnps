import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  public mGalleries: string[];
  public mPrograms: Array<any>;
  constructor(public auth: AuthService,
    private api: ApiService) {
    this.mGalleries = [];
    this.mPrograms = [
      {level:'level1', ariatext:'Basic Photography'},
      {level:'level2',ariatext:'Mid-Level Photography'},
      {level:'level3',ariatext:'Advance Photography'}
    ];
  }

  ngOnInit() {
    this.api.get('galleries')
      .subscribe(data => {
        data.forEach(item => {
          if (!this.mGalleries.some(i => i === item.gallery)) {
            if(item.gallery !== 'home' && item.gallery !== 'about'){
              this.mGalleries.push(item.gallery);
            }
          }
        });
      });
  }

  logout() {
    this.auth.logout();
  }
}
