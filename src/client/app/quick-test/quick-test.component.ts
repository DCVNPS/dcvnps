import { Component, OnInit } from '@angular/core';
import { ModalService } from '../services/modal.service';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-quick-test',
  templateUrl: './quick-test.component.html',
  styleUrls: ['./quick-test.component.scss']
})
export class QuickTestComponent implements OnInit {
  imgSrc: string = "profiles/member/2018/member-2018.jpg";
  constructor(private modalService: ModalService) {
  }
  ngOnInit(){
    
  }
  showModal() {
    let inputs = {
      isMobile: false,
      imgSrc:"profiles/member/2018/member-2018.jpg"
    }
    this.modalService.init(ModalComponent, inputs, {});
  }

}
