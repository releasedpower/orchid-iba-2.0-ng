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
  currentPage = 1;
  itemsPerPage = 15; 

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
  // END FILTRES

  ngOnInit(): void {
    this.getComptes();
  }
  getComptes(){
    const subscription = this.compteService.getComptes().subscribe({
      next:(result)=>{
        this.comptes=result;
        this.getTransactions(this.comptes[0].cpt_vcode);
      },
      error:(error)=>{
        console.log(error);
      }
    });
    this.subscriptions.push(subscription);
  }
  getTransactions(cpt_vcode:string){
    const subscription = this.transactionService.getTransactions(cpt_vcode).subscribe({
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
  getTransactionsDate(){
    if(this.comptes){
      const subscription = this.transactionService.getTransactionsDate(
        this.comptes[0].cpt_vcode,
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
  generateDynamicPDF() {
    const pdf = new jspdf.jsPDF();
    const totalPagesExp = "{total_pages_count_string}";
  
    const pageWidth = pdf.internal.pageSize.width;
    const pageHeight = pdf.internal.pageSize.height;
    const margins = {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
    };
  
    pdf.setFontSize(12);
    pdf.text("Transactions Report", margins.left, 20);
  
    let startY = 40;
  
    const pageContent = (data: any) => {
      // This is the content of each page
      pdf.setFontSize(10);
      pdf.text(data, margins.left, startY);
    };
  
    let transactionsPerPage = 20; // Adjust as needed
    let currentPage = 1;
    let dataIndex = 0;
  
    const generatePage = () => {
      // Generate a page with transactions
      pdf.addPage();
      pageContent(this.filteredTransactions.slice(dataIndex, dataIndex + transactionsPerPage).map((transaction:any) => {
        return `${transaction.trans_vnum} | ${transaction.trans_ddate } | ${transaction.typetrans_vlibelle} | ${transaction.trans_vmontant} Ar | ${transaction.trans_vdescript} | ${transaction.trans_vstatus}`;
      }).join('\n'));
      dataIndex += transactionsPerPage;
    };
  
    while (dataIndex < this.filteredTransactions.length) {
      // Continue adding pages until all data is processed
      generatePage();
      currentPage++;
    }
  
    // Add total page count
    for (let i = 1; i < currentPage; i++) {
      pdf.setPage(i);
      pdf.text(
        `Page ${i} of ${currentPage - 1}`,
        pageWidth - margins.right - 50,
        pageHeight - margins.bottom + 10
      );
    }
  
    // Save the PDF with a dynamic name
    const pdfName = `transactions_report_${new Date().toISOString()}.pdf`;
    pdf.save(pdfName);
  }
}
