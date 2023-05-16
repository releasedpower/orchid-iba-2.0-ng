import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'addSpaces' })
export class AddSpacesPipe implements PipeTransform {
  transform(value: number): string {
    let roundedValue = Math.round(value * 10) / 10; // Round to the nearest 10th
    let strValue = roundedValue.toString();
    let result = '';
    for (let i = 0; i < strValue.length; i++) {
      if (i > 0 && i % 3 === 0) {
        result = ' ' + result;
      }
      result = strValue[strValue.length - i - 1] + result;
    }
    return result;
  }
}