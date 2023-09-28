import { Component, OnInit } from '@angular/core';
import { BeneficiaireService } from '../../services/beneficiaire.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-beneficiaires',
  templateUrl: './beneficiaires.component.html',
  styleUrls: ['./beneficiaires.component.css']
})
export class BeneficiairesComponent implements OnInit {
  beneficiaires:any = [];
  filteredBeneficiaires:any = [];
  isLoading = true;
  isEmpty = false;
  selectedRowIndex: number = -1;
  constructor(private beneficiaireService:BeneficiaireService,private cookieService: CookieService,private router:Router) { }

  searchForm = new FormGroup({
    searchField : new FormControl('')
  });

  ngOnInit(): void {
    this.getBeneficiaires();
  }
  getBeneficiaires(){
    this.beneficiaireService.getBeneficiaires(this.cookieService.get('clt_vcode')).subscribe({
      next: (result)=> {
        this.beneficiaires = result;
        this.filteredBeneficiaires = [...this.beneficiaires];
      },
      complete:()=>{
        this.isLoading = false;
        if(this.beneficiaires.length <=0){
          this.isEmpty = true;
        }
      },
      error:error => console.log(error)
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
      error:error => console.log(error)
    });
  }
  refreshPage() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }
  toggleReverse(){
    this.beneficiaires.reverse();
  }
  searchBeneficiaire(){
    const searchField = this.searchForm.get('searchField')?.value?.toLowerCase();
    this.filteredBeneficiaires = this.beneficiaires.filter(
      (ben:any) => 
      ben.ben_vnom.toString().toLowerCase().includes(searchField)
      || ben.ben_vprenom.toString().toLowerCase().includes(searchField));
      console.log(this.filteredBeneficiaires);
  }
}
