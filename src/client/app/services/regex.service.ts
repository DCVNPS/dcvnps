import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegexService {
  constructor() { }

  fileExtension(fileName: string): string {
    return fileName.match(/[a-z]{3}$/i)[0];
  }

  regexpMatch(source: string, pattern: string): string {
    // console.log(pattern);
    const re = new RegExp(pattern, 'ig');
    // const found = re.exec(source);
    const found = source.match(re);
    // console.log(found);
    return found ? found[0] : null;
  }

  isAllowedExt(fileName: string, allowedExt: Array<string>): boolean {
    let isAllowed = false;
    const fileExt = this.fileExtension(fileName);
    if (allowedExt.indexOf(fileExt.toLowerCase()) !== -1) {
      isAllowed = true;
      // console.log(`file name: ${fileName} allowed extension: ${fileExt}`)
    }
    return isAllowed;
  }

  validFileName(fileName: string, pattern: string): boolean {
    let isValid = false;
    const found = this.regexpMatch(fileName, pattern);
    if (found) {
      isValid = true;
    }
    return isValid;
  }
}
