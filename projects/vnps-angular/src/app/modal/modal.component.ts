import { Component, OnInit, Input, ViewEncapsulation, Output, EventEmitter, ElementRef, OnDestroy } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'vnps-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ModalComponent implements OnInit, OnDestroy {

  @Input() showDialog = false;
  @Output() showDialogChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() id: string;
  private display = false;
  private element: any;
  constructor(
    private modalService: ModalService,
    private el: ElementRef
  ) {
    this.element = el.nativeElement;
    this.display = this.showDialog || false;
  }

  ngOnInit(): void {
    if (!this.id) {
      console.error('modal must have and id.');
      return;
    }
    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(this.element);

    // close modal on background click
    this.element.addEventListener('click', (el: { target: { className: string; }; }) => {
      if (el.target.className === 'ui modal') {
        this.close();
      }
    });

    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);

  }

  ngOnDestroy(): void {
    this.modalService.remove(this.id);
    this.element.remove();
  }

  open(): void {
    this.display = true;
    this.showDialogChange.emit(this.display);
  }

  close(): void {
    this.display = false;
    this.showDialogChange.emit(this.display);
  }
}
