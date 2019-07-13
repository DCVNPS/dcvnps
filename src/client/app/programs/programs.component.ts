import { Component, OnInit } from '@angular/core';
import { RouterLinkActive, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {
  private programLevel = 'level1';
  classFee = 50;
  public showLevel1: boolean;
  public showLevel2: boolean;
  public showLevel3: boolean;
  constructor(private route: ActivatedRoute) {
    this.showLevel1 = true;
    this.showLevel2 = false;
    this.showLevel3 = false;
    this.route.params.subscribe(params => {
      // console.log(params);
      //default the programs to Level1 program
      this.programLevel = params['level'] || 'level1';
      this.showProgram(this.programLevel);
    });
  }

  ngOnInit() {
  }
  showProgram(level:string){
    switch (level) {
      case 'level1': {
        this.showLevel1Program();
        break;
      }
      case 'level2': {
        this.showLevel2Program();
        break;
      }
      case 'level3': {
        this.showLevel3Program();
        break;
      }
      default: {
        this.showLevel1Program();
        break;
      }
    }
  }
  showLevel1Program() {
    this.showLevel1 = true;
    this.showLevel2 = false;
    this.showLevel3 = false;
  }
  showLevel2Program() {
    this.showLevel1 = false;
    this.showLevel2 = true;
    this.showLevel3 = false;
  }
  showLevel3Program() {
    this.showLevel1 = false;
    this.showLevel2 = false;
    this.showLevel3 = true;
  }
}
