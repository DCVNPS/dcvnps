import { Component, OnInit, ViewChild, Renderer, ElementRef, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  @Input() active: boolean = false;
  @Output() acceptDeny: EventEmitter<boolean> = new EventEmitter<boolean>();
  @ViewChild('confirmation') confirmDialog: ElementRef;
  constructor(private renderer: Renderer) { }

  ngOnInit() {
    let dialog = this.confirmDialog.nativeElement;
    this.renderer.setElementClass(dialog, 'active', this.active);
  }

  onAcceptDeny(accept: boolean){
    this.renderer.setElementClass(this.confirmDialog,'active', false);
    this.acceptDeny.emit(accept);
  }
}
