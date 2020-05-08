import { Component, OnInit } from '@angular/core';
import { ApiService } from './api/services/api.service';
import { AdminlevelDataService } from './api/services/adminlevel-data.service';

@Component({
  selector: 'vnps-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'vnps';

  constructor(private api: ApiService, private admLvlSrvc: AdminlevelDataService) {}

  ngOnInit() {
    const apiEnpoint = 'commons/adminlevel';
    this.api.get(apiEnpoint)
      .subscribe(
        data => {
          this.admLvlSrvc.AdminLevels = data;
        });
  }
}
