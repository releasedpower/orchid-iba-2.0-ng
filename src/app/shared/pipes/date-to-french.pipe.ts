import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateToFrench'
})
export class DateToFrenchPipe implements PipeTransform {

  private months: string[] = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
    'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  transform(value: string): string {
    const [year, month, day] = value.split('-');
    const monthIndex = parseInt(month, 10) - 1;

    return `${parseInt(day, 10)} ${this.months[monthIndex]} ${year}`;
  }
}
