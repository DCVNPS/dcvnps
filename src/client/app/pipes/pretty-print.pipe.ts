import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prettyPrint'
})
export class PrettyPrintPipe implements PipeTransform {

  // transform(value: any, args?: any): any {
  //   return null;
  // }
  transform(inStr: string, args?:any){
    const replacedStr = inStr.replace('/(\n\r|\r|\n)/g','<br/>');
    const  strArray = replacedStr.split('<br/>');
    for( let el of strArray){
      if(!!el === false){
        strArray.splice(strArray.indexOf(el), 1);
      }
    }
    return `<p>${strArray.join("</p><p>")}</p>`; 
  }
}
