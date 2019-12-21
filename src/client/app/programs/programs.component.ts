import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-programs',
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.scss']
})
export class ProgramsComponent implements OnInit {
  public programLevel = 'level1';
  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      // console.log(params);
      // default the programs to Level1 program
      this.programLevel = params['level'] || 'level1';
    });
  }

  ngOnInit() {
    const data = this.route.snapshot.data['programs'];
  }
}
