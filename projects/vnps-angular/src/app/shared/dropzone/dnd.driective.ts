/*
  This nice dropzone based on Luis Moncaris's Tutorial title
  How to create a Drag and Drop file directive in angular2 with angular-cli
  URL: https://scotch.io/@minrock/how-to-create-a-drag-and-drop-file-directive-in-angular2-with-angular-cli-part-1
    https://scotch.io/@minrock/how-to-create-a-drag-and-drop-file-directive-in-angular2-with-angular-cli-part-2
  The code was expanded to include regular expression for check file name format before upload to server.
*/
import { Directive, Output, EventEmitter, HostBinding, HostListener, Input } from '@angular/core';
import { RegexService } from '../services/regex.service';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[vnpsDnd]'
})
export class DndDirective {

  @Output() filesChangeEmitter: EventEmitter<Array<File>> = new EventEmitter();
  @Output() filesInvalidEmitter: EventEmitter<Array<File>> = new EventEmitter();
  @Input() allowedExtensions: Array<string> = [];
  @HostBinding('style.background') private background = '#eee';

  constructor(private regexService: RegexService) {
    window.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.stopPropagation();
    }, false);
    window.addEventListener('drop', (e) => {
      e.preventDefault();
      e.stopPropagation();
    }, false);
  }

  @HostListener('dragover', ['$event']) onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    const files = evt.dataTransfer.files;
    if (files.length > 0) {
      // do some stuff here
      this.background = '#999';
    }
  }

  @HostListener('drop', ['$event']) public onDrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
    const files = evt.dataTransfer.files;
    const fileList: Array<File> = [];
    const invlfileList: Array<File> = [];
    if (files.length > 0) {
      for (const f of files) {
        const allowedExt = this.regexService.isAllowedExt(f.name, this.allowedExtensions);
        if (allowedExt) {
            const validName = this.regexService.validFileName(f.name, '^[a-z0-9]+\\.[a-z0-9]+\\_.*\\.[a-z]{3,}$');
            if (validName) {
              fileList.push(f);
            } else {
              invlfileList.push(f);
            }
          } else {
            invlfileList.push(f);
          }
        }
      this.filesChangeEmitter.emit(fileList);
      this.filesInvalidEmitter.emit(invlfileList);
    }
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
  }
}
