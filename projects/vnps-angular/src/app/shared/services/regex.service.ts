import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RegexService {
  constructor() { }

  fileExtension(fileName: string): string | null{
    const result = fileName.match(/[a-z]{3,}$/i);
    return result ? result[0] : null;
  }

  regexpMatch(source: string, pattern: string): string | null{
    // console.log(pattern);
    const re = new RegExp(pattern, 'ig');
    // const found = re.exec(source);
    const found = source.match(re);
    // console.log(found);
    return found ? found[0] : null;
  }

  isAllowedExt(fileName: string, allowedExt: Array<string>): boolean {
    const fileExt = this.fileExtension(fileName);
    const isAllowed = fileExt ? (allowedExt.indexOf(fileExt.toLowerCase()) > -1) : false;
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
