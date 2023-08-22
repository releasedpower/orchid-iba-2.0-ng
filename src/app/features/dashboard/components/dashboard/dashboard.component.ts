import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { CompteService } from 'src/app/shared/services/compte/compte.service';
import { TransactionService } from 'src/app/shared/services/transaction/transaction.service';
import { Compte } from 'src/app/shared/interfaces/compte';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private subscriptions:Subscription[] = [];
  constructor(private compteService: CompteService, private transactionService: TransactionService) { }
  comptes:Compte [] = [];
  transRecentes:any[] = [];
  ngOnInit(): void {
    this.getComptes();
    this.getTransRecentes();
  }
  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  getComptes(){
    const subscription = this.compteService.getComptes().subscribe({
      next:(result)=>{
        this.comptes=result;
      },
      error:(error)=>{
        console.log(error);
      }
    });
    this.subscriptions.push(subscription);
  }
  getTransRecentes(){
    const subscription = this.transactionService.getTransRecentes('00125100001').subscribe({
      next:(result)=>{
        this.transRecentes=result;
      },
      error:(error)=>{
        console.log(error);
      }
    });
    this.subscriptions.push(subscription);
  }
  transform(value: number): string {
    let roundedValue = Math.round(value * 1) / 1; // Round to the nearest 10th
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
