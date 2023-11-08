import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { CompteService } from 'src/app/shared/services/compte/compte.service';
import { Subscription } from 'rxjs';
import { TransactionService } from 'src/app/features/transactions/services/transaction.service';
import { ClientService } from 'src/app/shared/services/client.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  constructor(private compteService: CompteService, private transactionService: TransactionService,
    private clientService: ClientService) { }
  comptes: any[] = [];
  transRecentes: any[] = [];
  depensesDuMois: any;
  depenses5Mois: any[] = [];
  revenus5Mois: any[] = [];
  revenusDuMois: any;
  isEmailWarningVisible = false;
  isLoading = true;
  isHidden = true;
  selectedCompte:any;

  chart:any = [];
  months:any = [];
  expenses:any = [];
  revenus:any = [];
  chartData:any = {};

  ngOnInit(): void {
    this.getComptes();
    this.checkEmail();
  }
  chartShow() {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: this.chartData,
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            // text: 'Chart.js Line Chart'
          }
        }
      },
    });
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  getComptes() {
    const subscription = this.compteService.getComptes().subscribe({
      next: (result) => {
        this.comptes = result;
        this.updateSolde();
        this.selectedCompte = this.comptes[0].cpt_vcode;
        this.getTransRecentes(this.selectedCompte);
        this.getDepensesDuMois();
        this.getRevenusDuMois();
        this.getDepensesAndRevenus5Mois(this.selectedCompte);
      },
      complete: () => {
        this.isLoading = false
      },
      error: (error) => {
        console.log(error);
      }
    });
    this.subscriptions.push(subscription);
  }
  toggleHiddenSolde() {
    this.isHidden = !this.isHidden;
    console.log(this.isHidden);
  }
  checkEmail() {
    const subscription = this.clientService.getEmail().subscribe({
      next: (result) => {
        console.log(result);
        if (!result.email) {
          this.isEmailWarningVisible = true;
        }
        else if (result.email) {
          this.isEmailWarningVisible = false;
        }
      },
      error: (error) => console.log(error)
    });
    this.subscriptions.push(subscription);
  }
  getTransRecentes(cpt_vcode:any) {
    const subscription = this.transactionService.getTransRecentes((cpt_vcode).toString()).subscribe({
      next: (result) => {
        this.transRecentes = result;
      },
      error: (error) => {
        console.log(error);
      }
    });
    this.subscriptions.push(subscription);
  }

  getDepensesAndRevenus5Mois(cpt_vcode:any) {
    const depenses$ = this.transactionService.getDepenses5Mois((cpt_vcode).toString());
    const revenus$ = this.transactionService.getRevenus5Mois((cpt_vcode).toString());
  
    forkJoin([depenses$, revenus$]).subscribe({
      next: ([depensesResult, revenusResult]) => {
        this.depenses5Mois = depensesResult;
        this.revenus5Mois = revenusResult;
        
        this.months = this.depenses5Mois.map((item) => item.month);
        this.expenses = this.depenses5Mois.map((item) => item.totalExpenses * -1);
        this.revenus = this.revenus5Mois.map((item) => item.totalIncome);
  
        this.chartData = {
          labels: this.months.reverse(),
          datasets: [
            { 
              data: this.revenus.reverse(), // Your sample data
              label: 'Revenus',
              borderColor: '#1d7808',
              fill: false,
            },
            { 
              data: this.expenses.reverse(),
              label: 'Dépenses',
              borderColor: '#fc0303',
              fill: false,
            },
          ],
        };
        this.chartShow();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  
  updateSolde() {
    const subscription = this.transactionService.updateSolde((this.comptes[0].cpt_vcode).toString()).subscribe({
      next: () => {
      },
      error: (error) => {
        console.log(error);
      }
    });
    this.subscriptions.push(subscription);
  }
  getDepensesDuMois() {
    const subscription = this.transactionService.getDepensesDuMois((this.comptes[0].cpt_vcode).toString()).subscribe({
      next: (result) => {
        this.depensesDuMois = result;
      },
      error: (error) => {
        console.log(error);
      }
    });
    this.subscriptions.push(subscription);
  }
  getRevenusDuMois() {
    const subscription = this.transactionService.getRevenusDuMois((this.comptes[0].cpt_vcode).toString()).subscribe({
      next: (result) => {
        this.revenusDuMois = result;
      },
      error: (error) => {
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
  onSelectChange(event: any) {
    this.selectedCompte = event.target.value; // Update selectedCompte on change
    this.getDepensesAndRevenus5Mois(this.selectedCompte);
    this.getTransRecentes(this.selectedCompte);
}
}
