import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { paypalDescription } from '../models/paypal.descriptiont';
import { VnpsClass } from '../models/vnps-class';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-vnps-classes',
  templateUrl: './vnps-classes.component.html',
  styleUrls: ['./vnps-classes.component.scss']
})
export class VnpsClassesComponent implements OnInit, OnDestroy {
  private classLevel: string = 'level1';
  classFee = 50;
  public paypalDesc: paypalDescription = paypalDescription.enrollmentFee;
  private data: Array<VnpsClass> = []; 
  public classMenu: Array<any> = [];
  public curClass: VnpsClass;
  public showLevel1: boolean = false;
  public showLevel2: boolean = false;
  public showLevel3: boolean = false;
  private destroyed = new Subject<any>();

  constructor(private route: ActivatedRoute,
    private router: Router,
    private api: ApiService) {
      this.initializeData();
  }

  ngOnInit() {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      takeUntil(this.destroyed)
    ).subscribe(() => {
      this.initializeData();
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  initializeData() {
    this.data = this.route.snapshot.data.classesData;
    this.classMenu = this.route.snapshot.data.classMenu;
    // console.log(this.data);
    this.curClass = this.data[0];
    console.log(this.classMenu);
  }

}
