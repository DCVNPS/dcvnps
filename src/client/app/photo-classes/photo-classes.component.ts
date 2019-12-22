import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { paypalDescription } from '../models/paypal.descriptiont';
import { PhotoClass } from '../models/photo-class';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-photo-classes',
  templateUrl: './photo-classes.component.html',
  styleUrls: ['./photo-classes.component.scss']
})
export class PhotoClassesComponent implements OnInit, OnDestroy {
  private classLevel: string = 'level1';
  classFee = 50;
  public paypalDesc: paypalDescription = paypalDescription.enrollmentFee;
  private data: Array<PhotoClass> = []; 
  public classMenus: Array<any> = [];
  public curClass: PhotoClass;
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
    this.classMenus = this.route.snapshot.data.classMenu;
    // console.log(this.data);
    this.curClass = this.data[0];
    // console.log(this.classMenus);
  }

}
