import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BanqueService } from 'src/app/shared/services/banque.service';
import { BeneficiaireService } from '../../services/beneficiaire.service';

@Component({
  selector: 'app-beneficiaire-nouveau',
  templateUrl: './beneficiaire-nouveau.component.html',
  styleUrls: ['./beneficiaire-nouveau.component.css']
})
export class BeneficiaireNouveauComponent implements OnInit {
  banques: any;
  agences: any;
  selectedBanque: any = '00004';
  selectedAgence:any;
  
  beneficiaireForm = new FormGroup({
    benNom: new FormControl('', [Validators.required]),
    benPrenom: new FormControl('', [Validators.required]),
    benBanqueCode: new FormControl('', [Validators.required]),
    benAgenceCode: new FormControl('', [Validators.required]),
    benCompteCode: new FormControl('', [Validators.required]),
    benRib: new FormControl('', [Validators.required]),
    benClientCode: new FormControl(localStorage.getItem('userId')),
  });
  constructor(private router:Router, private beneficiaireService:BeneficiaireService, private banqueService: BanqueService) { }

  ngOnInit(): void {
    this.agences=[];
    this.getBanques();
    this.getAgences(this.selectedBanque);
  }
  addBeneficiaire() {
    console.log(this.beneficiaireForm.value);
    this.beneficiaireService.addBeneficiaire(this.beneficiaireForm.value).subscribe(
      result=>location.reload(),
      error=>console.log(error)
      );
  }
  getBanques() {
    this.banqueService.getBanques().subscribe({
      next: result => this.banques = result,
      error: error => console.log(error)
    })
  };

  getAgences(banqueId: any) {
    this.banqueService.getAgences(banqueId).subscribe({
      next: result => {
        this.agences = Object.values(result);
        this.selectedAgence=this.agences[0].agenceCode;
        // console.log(this.selectedAgence);
      },
      error: error => console.log(error)
    })
  };

}
