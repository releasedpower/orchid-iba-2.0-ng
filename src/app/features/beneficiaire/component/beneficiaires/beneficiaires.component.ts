import { Component, OnInit } from '@angular/core';
import { BeneficiaireService } from '../../services/beneficiaire.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-beneficiaires',
  templateUrl: './beneficiaires.component.html',
  styleUrls: ['./beneficiaires.component.css']
})
export class BeneficiairesComponent implements OnInit {
  beneficiaires:any = [];
  selectedRowIndex: number = -1;
  constructor(private beneficiaireService:BeneficiaireService,private cookieService: CookieService,private router:Router) { }

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
  toggleConfirm(rowIndex: number) {
    this.selectedRowIndex = rowIndex;
  }
  cancel(){
    this.selectedRowIndex = -1;
  }
  confirmDelete(ben_iid:any){
    this.beneficiaireService.deleteBeneficaire(ben_iid).subscribe({
      next: () => {
        console.log('success delete');
        this.refreshPage();
      },
      error: error => console.log(error)
    });
  }
  refreshPage() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }
}
