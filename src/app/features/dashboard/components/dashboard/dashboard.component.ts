import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { CompteService } from 'src/app/shared/services/compte/compte.service';
import { Compte } from 'src/app/shared/interfaces/compte';
import { Subscription } from 'rxjs';
import { TransactionService } from 'src/app/features/transactions/services/transaction.service';
import { ClientService } from 'src/app/shared/services/client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private subscriptions:Subscription[] = [];
  constructor(private compteService: CompteService, private transactionService: TransactionService,
    private clientService:ClientService) { }
  comptes:any [] = [];
  transRecentes:any[] = [];
  isEmailWarningVisible = false;
  isLoading = true;
  ngOnInit(): void {
    this.getComptes();
    this.checkEmail();
  }
  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  getComptes(){
    const subscription = this.compteService.getComptes().subscribe({
      next:(result)=>{
        this.comptes=result;
        this.getTransRecentes();
      },
      complete:()=> this.isLoading=false,
      error:(error)=>{
        console.log(error);
      }
    });
    this.subscriptions.push(subscription);
  }
  checkEmail(){
    const subscription = this.clientService.getEmail().subscribe({
      next: (result) => {
        console.log(result);
        if(!result.email){
          this.isEmailWarningVisible = true;
        }
        else if(result.email){
          this.isEmailWarningVisible = false;
        }
      },
      error: (error) =>console.log(error)
    });
    this.subscriptions.push(subscription);
  }
  getTransRecentes(){
    const subscription = this.transactionService.getTransRecentes((this.comptes[0].cpt_vcode).toString()).subscribe({
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
