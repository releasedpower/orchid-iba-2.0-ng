import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BeneficiaireService } from '../../services/beneficiaire.service';

@Component({
  selector: 'app-beneficiaire-liste',
  templateUrl: './beneficiaire-liste.component.html',
  styleUrls: ['./beneficiaire-liste.component.css']
})
export class BeneficiaireListeComponent implements OnInit {
  beneficiaires:any;
  loading = true;
  constructor(private beneficiaireService:BeneficiaireService) {
    this.beneficiaires=[];
  }

  searchForm = new FormGroup({
    term: new FormControl('')
  });

  termNgModel:string = '';

  ngOnInit(): void {
    this.getBeneficiaires();
  }
  getBeneficiaires(){
    this.beneficiaireService.getBeneficiaires().subscribe(result =>{
      this.beneficiaires=result || [];
      this.loading = false;
    });
  }
  deleteBeneficiaire(id:any){
    this.beneficiaireService.deleteBeneficiaire(id).subscribe(result =>{
      console.log('deleted');
      location.reload();
    });
  }
  searchBeneficiaire(term:string){
    this.beneficiaireService.searchBeneficiaire(term).subscribe({
      next:result =>{this.beneficiaires = result}
    });
  }
}
