import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { stringify } from 'querystring';
import { isNullOrUndefined } from 'util';
import { validateStyleParams } from '@angular/animations/browser/src/util';

/* This directive is from https://github.com/changhuixu/ngx-digit-only/blob/master/projects/uiowa/digit-only/src/lib/digit-only.directive.ts*/
@Directive({
  selector: '[digitOnly]'
})
export class DigitOnlyDirective {
  private decimalCounter: number = 0;
  private navigationKeys: Array<string> = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    'Home',
    'End',
    'ArrowLeft',
    'ArrowRight',
    'Clear',
    'Copy',
    'Paste'
  ];
  @Input() decimal?: boolean = false;
  @Input() scale?: number;
  inputElement: HTMLInputElement;
  constructor(public el: ElementRef) {
    this.inputElement = el.nativeElement;
  }

  @HostListener('keydown', ['$event']) onKeyDown(e: KeyboardEvent) {
    if (
      this.navigationKeys.indexOf(e.key) > -1 || // Allow: navigation keys: backspace, delete, arrows etc.
      (e.key === 'a' && e.ctrlKey === true) || // Allow: Ctrl+A
      (e.key === 'c' && e.ctrlKey === true) || // Allow: Ctrl+C
      (e.key === 'v' && e.ctrlKey === true) || // Allow: Ctrl+V
      (e.key === 'x' && e.ctrlKey === true) || // Allow: Ctrl+X
      (e.key === 'a' && e.metaKey === true) || // Allow: Cmd+A (Mac)
      (e.key === 'c' && e.metaKey === true) || // Allow: Cmd+C (Mac)
      (e.key === 'v' && e.metaKey === true) || // Allow: Cmd+V (Mac)
      (e.key === 'x' && e.metaKey === true) || // Allow: Cmd+X (Mac)
      (this.decimal && e.key === '.' && this.decimalCounter < 1) // Allow: only one decimal point
    ) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress
    if (e.key === ' ' || isNaN(Number(e.key))) {
      e.preventDefault();
    }
    // Ensure there's only a certain digits allows after decimall point
    if (this.isValidDecimal(this.inputElement.value) && !this.isValidScale(this.inputElement.value)) {
      e.preventDefault();
    }
  }

  @HostListener('keyup', ['$event'])  onKeyUp(e: KeyboardEvent) {
    if (!this.decimal) {
      return;
    } else {
      this.decimalCounter = this.inputElement.value.split('.').length - 1;
    }
  }

  @HostListener('paste', ['$event'])
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    let pastedInput: string = event.clipboardData.getData('text/plain');
    pastedInput = this.sanitizeInput(pastedInput);
    const pasted = document.execCommand('insertText', false, pastedInput);
    if (!pasted) {
      const { selectionStart: start, selectionEnd: end } = this.inputElement;
      this.inputElement.setRangeText(pastedInput, start, end, 'end');
    }
  }

  @HostListener('drop', ['$event'])
  onDrop(event: DragEvent) {
    event.preventDefault();
    let textData = event.dataTransfer.getData('text');
    this.inputElement.focus();

    textData = this.sanitizeInput(textData);
    const pasted = document.execCommand('insertText', false, textData);
    if (!pasted) {
      const { selectionStart: start, selectionEnd: end } = this.inputElement;
      this.inputElement.setRangeText(textData, start, end, 'end');
    }
  }

  private sanitizeInput(input: string): string {
    if (this.decimal && this.isValidDecimal(input)) {
      return input.replace(/[^0-9.]/g, '');
    } else {
      return input.replace(/[^0-9]/g, '');
    }
  }

  isValidDecimal(string: string): boolean {
    return string.split('.').length <= 2;
  }
  isValidScale(valString: string): boolean {
    if (isNullOrUndefined(this.scale)) {
      return true;
    }
    const scalePart = valString.split('.')[1];
    if (scalePart) {
      return scalePart.length < this.scale;
    }
    return true;
  }
}
