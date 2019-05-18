/*
  This nice dropzone based on Luis Moncaris's Tutorial title
  How to create a Drag and Drop file directive in angular2 with angular-cli 
  URL: https://scotch.io/@minrock/how-to-create-a-drag-and-drop-file-directive-in-angular2-with-angular-cli-part-1
    https://scotch.io/@minrock/how-to-create-a-drag-and-drop-file-directive-in-angular2-with-angular-cli-part-2
*/
import { Directive, Output, EventEmitter, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDnd]'
})
export class DndDirective {

  @Output() private filesChangeEmitter: EventEmitter<Array<File>> = new EventEmitter();
  @Output() private filesInvalidEmitter: EventEmitter<Array<File>> = new EventEmitter();
  @Input() private allowed_extensions: Array<string> = [];
  @HostBinding('style.background') private background = '#eee';
  constructor() { }

  @HostListener('dragover', ['$event']) onDragOver(evt){
    evt.preventDefault();
    evt.stopPropagation();
    let files = evt.dataTransfer.files;
    if(files.length > 0){
      //do some stuff here
      this.background = '#999';
    }
  }

  @HostListener('drop', ['$event']) public onDrop(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
    let files = evt.dataTransfer.files;
    let fileList:Array<File> = [];
    let invlfileList: Array<File> = [];
    if(files.length > 0){
      for(let i = 0; i < files.length; i++){
        const fileExt = files[i].name.match(/[a-z]{3}$/i)[0];
        // console.log(`${files[i].name} ${fileExt}`);
        const allowedExt = this.allowed_extensions.find((e) => e.toLocaleLowerCase() === fileExt.toLowerCase());
        if(allowedExt){
          fileList.push(files[i]);
        } else {
          invlfileList.push(files[i]);
        }
      };
      this.filesChangeEmitter.emit(fileList);
      this.filesInvalidEmitter.emit(invlfileList);
    }
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt){
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
  }
}
