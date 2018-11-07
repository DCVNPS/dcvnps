import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-slide',
  templateUrl: './slide.component.html',
  styleUrls: ['./slide.component.scss']
})
export class SlideComponent {
  isActive = false;
  @Input() public width: 800;
  @Input() public heigh: 600;
  constructor() {
    this.isActive = false;
  }

}
