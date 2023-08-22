import { Component, OnInit } from '@angular/core';
import { BeneficiaireService } from '../../services/beneficiaire.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-beneficiaires',
  templateUrl: './beneficiaires.component.html',
  styleUrls: ['./beneficiaires.component.css']
})
export class BeneficiairesComponent implements OnInit {
  beneficiaires:any = [];
  constructor(private beneficiaireService:BeneficiaireService,private cookieService: CookieService) { }

  ngOnInit(): void {
    this.getBeneficiaires();
  }
  getBeneficiaires(){
    this.beneficiaireService.getBeneficiaires(this.cookieService.get('clt_vcode')).subscribe({
      next: (result)=> {
        this.beneficiaires = result;
        console.log(this.cookieService.get('clt_vcode'));
        console.log(result);
      },
      error:error => console.error()
    });
  }
}
