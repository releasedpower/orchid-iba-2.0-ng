import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'digitmask'
})
export class DigitmaskPipe implements PipeTransform {

  transform(value: string): string {
    if (value && value.length >= 3) {
      const maskedChars = value.substring(4).replace(/\d/g, '*');
      return value.substring(0, 4) + maskedChars;
    }
    return value;
  }

}
