import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { paypalDescription } from '../models/paypal.descriptiont';

@Component({
  selector: 'app-photo-classes',
  templateUrl: './photo-classes.component.html',
  styleUrls: ['./photo-classes.component.scss']
})
export class PhotoClassesComponent implements OnInit {
  private classLevel: string = 'level1';
  classFee = 50;
  public paypalDesc: paypalDescription = paypalDescription.enrollmentFee;
  public showLevel1: boolean;
  public showLevel2: boolean;
  public showLevel3: boolean;
  public level1Data: any;
  public level2Data: any;
  public level3Data: any;

  constructor(private route: ActivatedRoute) { 
    this.showLevel1 = true;
    this.showLevel2 = false;
    this.showLevel3 = false;
    this.route.params.subscribe(params => {
      // console.log(params);
      // default the programs to Level1 program
      this.classLevel = params['level'] || 'level1';
      this.showClass(this.classLevel);
    });
  }

  ngOnInit() {
    const data = this.route.snapshot.data['photoclasses'];
    this.level1Data = data.find(lvl => lvl.title === 'level 1');
    this.level2Data = data.find(lvl => lvl.title === 'level 2');
    this.level3Data = data.find(lvl => lvl.title === 'level 3');
    // console.log(this.level1Data);
    // console.log(this.level2Data);
    // console.log(this.level3Data);
  }
  showClass(level: string) {
    switch (level) {
      case 'level1': {
        this.showLevel1Class();
        break;
      }
      case 'level2': {
        this.showLevel2Class();
        break;
      }
      case 'level3': {
        this.showLevel3Class();
        break;
      }
      default: {
        this.showLevel1Class();
        break;
      }
    }
  }
  showLevel1Class() {
    this.showLevel1 = true;
    this.showLevel2 = false;
    this.showLevel3 = false;
  }
  showLevel2Class() {
    this.showLevel1 = false;
    this.showLevel2 = true;
    this.showLevel3 = false;
  }
  showLevel3Class() {
    this.showLevel1 = false;
    this.showLevel2 = false;
    this.showLevel3 = true;
  }

}
