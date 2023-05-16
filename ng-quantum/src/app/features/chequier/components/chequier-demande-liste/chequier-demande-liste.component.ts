import { Component, OnInit } from '@angular/core';
import { ChequierService } from '../../services/chequier.service';

@Component({
  selector: 'app-chequier-demande-liste',
  templateUrl: './chequier-demande-liste.component.html',
  styleUrls: ['./chequier-demande-liste.component.css']
})
export class ChequierDemandeListeComponent implements OnInit {

  constructor(private chequierService:ChequierService) { }
  demandesChequier:any;
  ngOnInit(): void {
    this.getDemandesChequierByCompte('01151100001');
  }

  getDemandesChequierByCompte(compteId:string){
    return this.chequierService.getDemandesChequierByCompte(compteId).subscribe({
      next:result=>{
        this.demandesChequier = result;
      },
      error:error=>{
        console.log(error);
      }
    });
  }
}
