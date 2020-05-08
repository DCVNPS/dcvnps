import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vnps-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  goToTop(){
    window.scroll(0,0);
  }
}
