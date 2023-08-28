import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor() { }
  formatDateToFrench(dateString: string): string {
    const months = [
      'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet',
      'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
  
    const [year, month, day] = dateString.split('-');
    const monthIndex = parseInt(month, 10) - 1;
    
    return `${parseInt(day, 10)} ${months[monthIndex]} ${year}`;
  }
}
