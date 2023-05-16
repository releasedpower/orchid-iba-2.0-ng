import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  soldeLoadedState: boolean = false;
  transLoadedState: boolean = false;
  cptHidden = true;

  soldes: any;
  userInfo: any;
  transactions: any;

  depensesMois: any;
  recettesMois:any;

  selectedCompte: any;
  constructor(private userService: UserService) {
    this.soldes = [];
    this.userInfo = [];
    this.transactions = [];
  }

  async ngOnInit(): Promise<void> {
    await this.getSolde();
    console.log(this.soldes);
    this.selectedCompte=this.soldes[0].cpt_vcode;
    this.getTransactions(this.soldes[0].cpt_vcode);
    this.getDepensesMois(this.soldes[0].cpt_vcode);
    this.getRecettesMois(this.soldes[0].cpt_vcode);
  }
  getSolde(): Promise<void> {
    return new Promise(resolve => {
      this.userService.getSolde().subscribe({
        next: result => {
          this.soldes = result;
          resolve();
        },
        error: error => {
          console.log(error);
          resolve();
        },
        complete: () => { this.soldeLoadedState = true }
      })
    });
  };

  getDepensesMois(compte: any) {
    this.userService.getDepensesMois(compte).subscribe({
      next: result => {
        this.depensesMois = result[0].depenses;
      },
      error: error => console.log(error)
    })
  };

  getRecettesMois(compte: any) {
    this.userService.getRecettesMois(compte).subscribe({
      next: result => {
        this.recettesMois = result[0].recettes;
      },
      error: error => console.log(error)
    })
  };

  getTransactions(compte: any) {
    this.userService.getTransactions(compte).subscribe({
      next: result => {
        this.transactions = result;
      },
      error: error => console.log(error),
      complete: () => { this.transLoadedState = true }
    })
  };
  toggleCptHidden(){
    if(this.cptHidden === true){
      this.cptHidden = false;
    }
    else this.cptHidden = true;
  }
}
