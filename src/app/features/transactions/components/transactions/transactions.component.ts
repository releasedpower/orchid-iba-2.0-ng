import { Component, OnInit } from '@angular/core';
import { CompteService } from 'src/app/shared/services/compte/compte.service';
import { TransactionService } from '../../services/transaction.service';
import { Subscription } from 'rxjs';
import { UtilityService } from 'src/app/shared/services/utility.service';
import html2canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  private subscriptions:Subscription[] = [];

  constructor(private compteService: CompteService, private transactionService: TransactionService,private utility:UtilityService) { }
  comptes:any = [];
  transactions:any[] = [];
  filteredTransactions:any = [];
  currentPage: number = 1;
  itemsPerPage = 15; 
  isLoading = false;
  selectedCompte:any;
  betweenDatesForm = new FormGroup({
    debut: new FormControl('',[Validators.required]),
    fin: new FormControl('',[Validators.required])
  });


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
  ngOnInit(): void {
    this.getComptes();
    console.log(this.currentPage)
  }
  getComptes(){
    const subscription = this.compteService.getComptes().subscribe({
      next:(result)=>{
        this.comptes=result;
        this.selectedCompte=this.comptes[0].cpt_vcode;
        this.getTransactions(this.selectedCompte,this.currentPage);
      },
      error:(error)=>{
        console.log(error);
      }
    });
    this.subscriptions.push(subscription);
  }
  getTransactions(cpt_vcode: string, pageNumber: number): void {
    this.isLoading = true;
    const subscription = this.transactionService.getTransactions(cpt_vcode, pageNumber).subscribe({
      next: (result) => {
        this.transactions = result;
        this.filteredTransactions = [...this.transactions];
        this.isLoading = false; 
      },
      error: (error) => {
        console.log(error);
        this.isLoading = false;
      },
    });
    this.subscriptions.push(subscription);
  }
  
  loadNextPage(): void {
    this.currentPage++; 
    this.getTransactions(this.comptes[0].cpt_vcode,this.currentPage); 
    console.log(this.currentPage)
  }
  loadPreviousPage(): void {
    this.currentPage--; 
    this.getTransactions(this.comptes[0].cpt_vcode,this.currentPage);
    console.log(this.currentPage)
  }
  getTransactionsDate(){
    if(this.comptes){
      const subscription = this.transactionService.getTransactionsDate(
        this.selectedCompte,
        this.betweenDatesForm.get('debut')?.value,
        this.betweenDatesForm.get('fin')?.value).subscribe({
        next:(result)=>{
          console.log("ok");
          this.transactions=result;
          this.filteredTransactions = [...this.transactions]; //manao copy an'i transactions mankany am filtered
        },
        error:(error)=>{
          console.log(error);
        }
      });
      this.subscriptions.push(subscription);
    }
  }
  pdfTransactions() {
    const cpt_vcode = this.selectedCompte;
    const debut = this.betweenDatesForm.get('debut')?.value;
    const fin = this.betweenDatesForm.get('fin')?.value;
  
    this.transactionService.getTransactionsDatePDF(cpt_vcode, debut, fin).subscribe(
      (data: Blob) => {
        const downloadURL = window.URL.createObjectURL(data);
        const link = document.createElement('a');
        link.href = downloadURL;
        link.download = 'transactions.pdf';
        link.click();
      },
      (error) => {
        console.error(error);
      }
    );
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
  onSelectChange(event: any) {
    this.selectedCompte = event.target.value; // Update selectedCompte on change
    this.getTransactions(this.selectedCompte,this.currentPage);
}
}
