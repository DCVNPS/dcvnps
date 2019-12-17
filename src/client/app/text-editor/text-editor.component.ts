import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss']
})
export class TextEditorComponent implements OnInit, OnChanges {
  @Input() controlHeight: number = 400;
  @Input() textToEdit: string;
  @Output() textToEditChange: EventEmitter<string> = new EventEmitter<string>();
  public tinyInit: Object;
  public content: string;
  constructor() { }

  ngOnInit() {
    this.content = this.textToEdit;
    this.tinyInit = {
      plugins: 'fullscreen image media link insertdatetime advlist lists wordcount imagetools',
      // tslint:disable-next-line: max-line-length
      toolbar: 'formatselect | bold italic forecolor backcolor permanentpen formatpainter | link image media| alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent',
      height: this.controlHeight
    };
  }

  ngOnChanges(){

  }
  onSave(){
    this.textToEditChange.emit(this.content);
  }
  onCancel(){
    this.content = this.textToEdit;
  }
}
