import { Component, OnInit } from '@angular/core';
import { ChequierService } from '../../services/chequier.service';
import { CompteService } from 'src/app/shared/services/compte/compte.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-historique-chequier',
  templateUrl: './historique-chequier.component.html',
  styleUrls: ['./historique-chequier.component.css']
})
export class HistoriqueChequierComponent implements OnInit {

  constructor(private cookieService:CookieService,private chequierService:ChequierService, 
    private compteService:CompteService,
    private router:Router) { }
  comptes:any= [];
  demandesChequier:any = [];
  selectedRowIndex:number = -1;
  ngOnInit(): void {
    this.getComptes();
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
  getComptes(){
    this.compteService.getComptes().subscribe({
      next: result=> {
        this.comptes = result;
        this.getDemandesChequier(this.comptes[0].cpt_iid);
      },
      error: error => console.log(error)
    });
  }
  toggleConfirm(rowIndex: number) {
    this.selectedRowIndex = rowIndex;
  }
  cancel(){
    this.selectedRowIndex = -1;
  }
  confirmDelete(demchq_iid:any){
    this.chequierService.deleteDemandeChequier(demchq_iid).subscribe({
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
