import { Component, OnInit } from '@angular/core';
import { CompteService } from 'src/app/shared/services/compte/compte.service';
import { ChequierService } from '../../services/chequier.service';
import { BrancheService } from 'src/app/shared/services/banque/branche.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-commande-chequier',
  templateUrl: './commande-chequier.component.html',
  styleUrls: ['./commande-chequier.component.css']
})
export class CommandeChequierComponent implements OnInit {
  private subscriptions:Subscription[] = [];

  comptes:any= [];
  branches:any= [];
  typesChequier:any = [];
  constructor(private compteService: CompteService, private chequierService:ChequierService , private brancheService:BrancheService) { }

  ngOnInit(): void {
    this.getComptes();
    this.getTypesChequier();
    this.getBranches();
  }
  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  demandeChequierForm = new FormGroup({
    demchq_cpt_iid : new FormControl(''),
    demchq_itypechq : new FormControl(''),
    demchq_vnbpage : new FormControl(''),
    demchq_inbcarnet : new FormControl(''),
    demchq_branche_recupiid : new FormControl(''),
  });

  getComptes(){
    const subscription = this.compteService.getComptes().subscribe({
      next:(result) => {
        this.comptes = result;
      },
      error:error => console.error(error)
    });
    this.subscriptions.push(subscription);
  }
  getTypesChequier(){
    const subscription = this.chequierService.getTypesChequier().subscribe({
      next:(result) => {
        this.typesChequier = result;
      },
      error:error => console.error(error)
    });
    this.subscriptions.push(subscription);
  }
  getBranches(){
    const subscription = this.brancheService.getBranches('00015').subscribe({
      next:(result) => {
        this.branches = result;
      },
      error:error => console.error(error)
    });
    this.subscriptions.push(subscription);

  }
  addDemandeChequier(){
    const subscription = this.chequierService.insertDemandeChequier(this.demandeChequierForm.value).subscribe({
      next:() =>console.log('success'),
      error:(error) => console.log(error)
    })
    this.subscriptions.push(subscription);

  }

}
