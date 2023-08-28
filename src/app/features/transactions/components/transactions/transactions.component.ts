import { Component, OnInit } from '@angular/core';
import { CompteService } from 'src/app/shared/services/compte/compte.service';
import { TransactionService } from '../../services/transaction.service';
import { Subscription } from 'rxjs';
import { UtilityService } from 'src/app/shared/services/utility.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  private subscriptions:Subscription[] = [];

  constructor(private compteService: CompteService, private transactionService: TransactionService,private utility:UtilityService) { }
  comptes:any = [];
  transactions:any = [];
  filteredTransactions:any = [];
  currentPage = 1;
  itemsPerPage = 15; 

  // FILTRES
  isReversed:boolean =false;
  selectedTypeFilter = '';
  selectedStatus = '';
  toggleReverse(){
    this.filteredTransactions.reverse();
  }
  filterTypeTransactions() {
    if (this.selectedTypeFilter === '') {
      this.filteredTransactions = this.transactions;
    } else {
      this.filteredTransactions = this.transactions.filter((trans: any) => trans.typetrans_vlibelle === this.selectedTypeFilter);
    }
  }
  // END FILTRES

  ngOnInit(): void {
    this.getTransactions();
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
  getTransactions(){
    const subscription = this.transactionService.getTransactions('00125100001').subscribe({
      next:(result)=>{
        this.transactions=result;
        this.filteredTransactions = [...this.transactions]; //manao copy an'i transactions mankany am filtered
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
