import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BanqueService } from 'src/app/shared/services/banque.service';
import { UserService } from 'src/app/shared/services/user.service';
import { ChequierService } from '../../services/chequier.service';

@Component({
  selector: 'app-chequier-demande',
  templateUrl: './chequier-demande.component.html',
  styleUrls: ['./chequier-demande.component.css']
})
export class ChequierDemandeComponent implements OnInit {
  comptes:any;
  agences:any;
  typesChequier:any;
  typesCarnet:any;

  recuperation=true;
  livraison=false;

  selectedMoyenLivraison:any=1;
  demandeChequierForm = new FormGroup({

  });

  constructor(private userService:UserService, private banqueService:BanqueService,private chequierService:ChequierService) { }

  ngOnInit(): void {
    this.comptes=[];
    this.getComptes();
    this.getAgences('00008');
    this.getTypeCarnet();
    this.getTypeChequier();
  }
  getComptes() {
    this.userService.getSolde().subscribe({
      next: result => this.comptes = result,
      error: error => console.log(error)
    })
  };

  changeMoyenLivraison(){
    console.log(this.selectedMoyenLivraison);
    if(this.selectedMoyenLivraison==1){
      this.recuperation=true;
      this.livraison=false;
    }
    else {
      this.recuperation=false;
      this.livraison=true;
    }
  }
  getAgences(banque:any){
    return this.banqueService.getAgences(banque).subscribe({
      next:result=>{
        this.agences = result;
      },
      error:error=> console.log(error)
    })
  }
  getTypeCarnet(){
    return this.chequierService.getTypeCarnet().subscribe({
      next:result=>{
        this.typesCarnet = result;
      },
      error:error=> console.log(error)
    })
  }
  getTypeChequier(){
    return this.chequierService.getTypeChequier().subscribe({
      next:result=>{
        this.typesChequier = result;
      },
      error:error=> console.log(error)
    })
  }
}
