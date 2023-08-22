import { Component, OnInit } from '@angular/core';
import { ChequierService } from '../../services/chequier.service';
import { CompteService } from 'src/app/shared/services/compte/compte.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-historique-chequier',
  templateUrl: './historique-chequier.component.html',
  styleUrls: ['./historique-chequier.component.css']
})
export class HistoriqueChequierComponent implements OnInit {

  constructor(private cookieService:CookieService,private chequierService:ChequierService, private compteService:CompteService) { }
  comptes:any= [];
  demandesChequier:any = [];
  ngOnInit(): void {
    this.compteService.getComptes();
    this.getDemandesChequier('8');
  }
  getDemandesChequier(cpt_iid:string){
    this.chequierService.getDemandesChequier(cpt_iid).subscribe({
      next:(result) => {
        this.demandesChequier = result;
        console.log(result);
      },
      error:error => console.error()
    }); 
  }
}
