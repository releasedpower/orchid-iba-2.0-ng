import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-releve',
  templateUrl: './releve.component.html',
  styleUrls: ['./releve.component.css']
})
export class ReleveComponent implements OnInit {
  transactions:any;
  transLoadedState = false;
  comptesLoadedState = false;
  comptes:any;
  selectedCompte: any;
  constructor(private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    await this.getComptes();
    this.selectedCompte=this.comptes[0].cpt_vcode;
    this.getTransactions(this.comptes[0].cpt_vcode);
  }

  getTransactions(compte: any) {
    this.userService.getTransactions(compte).subscribe({
      next: result => {
        this.transactions = result;
      },
      error: error => console.log(error),
      complete: () => { this.transLoadedState = true }
    })
  };

  getComptes(): Promise<void> {
    return new Promise(resolve => {
      this.userService.getSolde().subscribe({
        next: result => {
          this.comptes = result;
          resolve();
        },
        error: error => {
          console.log(error);
          resolve();
        },
        complete: () => { this.comptesLoadedState = true }
      })
    });
  };
}
