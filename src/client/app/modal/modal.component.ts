// this component is from Jason Watmore blog
// http://jasonwatmore.com/post/2019/04/16/angular-7-custom-modal-window-dialog-box
import { Component, OnInit, Input, OnDestroy, ElementRef } from '@angular/core';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'jw-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})

export class ModalComponent implements OnInit, OnDestroy {
  @Input() id: string;
  private element: any;

  constructor(private modalService: ModalService, private el: ElementRef) {
    this.element = el.nativeElement;
  }

  ngOnInit(): void {
    let modal = this;

    // ensure id attribute exists
    if (!this.id) {
      console.error('modal must have an id');
      return;
    }

    //make sure the element is hidden display=none;
    this.element.style.display = 'none';
    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', function (e: any) {
      if (e.target.className === 'jw-modal') {
        modal.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  // open modal
  open(): void {
    this.element.style.display = 'block';
    document.body.classList.add('jw-modal-open');
  }

  // close modal
  close(): void {
    this.element.style.display = 'none';
    document.body.classList.remove('jw-modal-open');
  }
}
