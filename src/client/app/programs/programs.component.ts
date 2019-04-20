import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {

  public showLevel1: boolean;
  public showLevel2: boolean;
  public showLevel3: boolean;
  constructor() {
    this.showLevel1 = true;
    this.showLevel2 = false;
    this.showLevel3 = false;
   }

  ngOnInit() {
  }
  showLevel1Program(){
    this.showLevel1 = true;
    this.showLevel2 = false;
    this.showLevel3 = false;
  }
  showLevel2Program(){
    this.showLevel1 = false;
    this.showLevel2 = true;
    this.showLevel3 = false;
  }
  showLevel3Program(){
    this.showLevel1 = false;
    this.showLevel2 = false;
    this.showLevel3 = true;
  }
}
