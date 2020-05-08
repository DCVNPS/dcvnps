import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

import { VnpsClassesMenu, VnpsClass } from '../../shared/models/interfaces';
import { PaypalDescription } from '../../shared/paypal-button/paypal.enum';
import { ActivatedRoute, Router, RouterEvent, NavigationEnd } from '@angular/router';
import { takeUntil, filter } from 'rxjs/operators';

@Component({
  selector: 'vnps-class',
  templateUrl: './class.component.html',
  styleUrls: ['./class.component.css']
})
export class ClassComponent implements OnInit, OnDestroy {

  private classLevel = 'level1';
  classFee = 50;
  public paypalDesc: string = PaypalDescription.enrollmentFee;
  private classData: Array<VnpsClass> = [];
  public classMenu: Array<VnpsClassesMenu> = [];
  public curClass: VnpsClass;
  public showLevel1 = false;
  public showLevel2 = false;
  public showLevel3 = false;
  private destroyed = new Subject<any>();

  constructor(
    private route: ActivatedRoute,
    private router: Router  ) {
    this.InitializeData();
   }

  ngOnInit(): void {
    this.router.events.pipe(
      filter((event: RouterEvent) => event instanceof NavigationEnd),
      takeUntil( this.destroyed)
    ).subscribe( () => {
      this.InitializeData();
    });
  }

  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }

  InitializeData(): void {
    this.classData = this.route.snapshot.data.classesData;
    this.classMenu = this.route.snapshot.data.classMenu;
    // initially set the current class to the first element
    // console.log({classData: this.classData, classMenu: this.classMenu});
    this.curClass = this.classData[0];
    this.paypalDesc = `${PaypalDescription.enrollmentFee} for ${this.curClass.classLevelDesc}`;
  }
}
