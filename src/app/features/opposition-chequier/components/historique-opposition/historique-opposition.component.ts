import { Component, OnInit } from '@angular/core';
import { OppositionService } from '../../services/opposition.service';
import { CompteService } from 'src/app/shared/services/compte/compte.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-historique-opposition',
  templateUrl: './historique-opposition.component.html',
  styleUrls: ['./historique-opposition.component.css']
})
export class HistoriqueOppositionComponent implements OnInit {
  private subscriptions:Subscription[] = [];
  constructor(private oppositionService: OppositionService, private compteService: CompteService,private router:Router) { }
  comptes:any = [];
  oppositionsChequier: any = [];
  selectedRowIndex:number = -1;
  ngOnInit(): void {
    this.getComptes();
  }
  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  getComptes(){
    const subscription = this.compteService.getComptes().subscribe({
      next: result=> {
        this.comptes = result;
        this.getOppositionsChequier(this.comptes[0].cpt_iid);
      },
      error: error => console.log(error)
    });
    this.subscriptions.push(subscription);
  }
  getOppositionsChequier(cpt_iid:string){
    const subscription = this.oppositionService.getOppositionsChequier(cpt_iid).subscribe({
      next:(result) => {
        this.oppositionsChequier = result;
        console.log(result);
      },
      error:error => console.error()
    }); 
    this.subscriptions.push(subscription);
  }
  toggleConfirm(rowIndex: number) {
    this.selectedRowIndex = rowIndex;
  }
  cancel(){
    this.selectedRowIndex = -1;
  }

  confirmDelete(oppchq_iid :any){
    const subscription = this.oppositionService.deleteOppositionChequier(oppchq_iid).subscribe({
      next: () => {
        console.log('success delete');
        this.refreshPage();
      },
      error: error => console.log(error)
    });
    this.subscriptions.push(subscription);
  }
  refreshPage() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }
  toggleReverse(){
    this.oppositionsChequier.reverse();
  }
}
