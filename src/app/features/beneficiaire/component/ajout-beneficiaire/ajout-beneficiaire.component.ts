import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { BanqueService } from 'src/app/shared/services/banque/banque.service';
import { BrancheService } from 'src/app/shared/services/banque/branche.service';
import { BeneficiaireService } from '../../services/beneficiaire.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ajout-beneficiaire',
  templateUrl: './ajout-beneficiaire.component.html',
  styleUrls: ['./ajout-beneficiaire.component.css']
})
export class AjoutBeneficiaireComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  constructor(private banqueService : BanqueService,
    private brancheService : BrancheService,
    private cookieService: CookieService,
    private beneficiaireService: BeneficiaireService) { }
  banques:any = [];
  branches:any = [];

  beneficiaireForm = new FormGroup({
    ben_vnom: new FormControl('', [Validators.required]),
    ben_vprenom: new FormControl('', [Validators.required]),
    banque_vcode: new FormControl('', [Validators.required]),
    branche_iid: new FormControl('', [Validators.required]),
    ben_vnumcpt: new FormControl('', [Validators.required,Validators.minLength(11),Validators.maxLength(11)]),
    ben_vclerib: new FormControl('', [Validators.required]),
    clt_vcode : new FormControl(this.cookieService.get('clt_vcode'))
  });

  ngOnInit(): void {
    this.getBanques();
  }
  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }
  getBanques(){
    const subscription = this.banqueService.getBanques().subscribe({
      next: result=> this.banques = result,
      error:error=> console.log(error)
    })
    this.subscriptions.push(subscription);
  }
  getBranches(selectedBanque:string){
    const subscription = this.brancheService.getBranches(selectedBanque).subscribe({
      next: result => this.branches = result,
      error: error => console.log(error)
    });
    this.subscriptions.push(subscription);
  }
  insertBeneficiaire(){
    const subscription = this.beneficiaireService.insertBeneficiaire(this.beneficiaireForm.value).subscribe({
      next: () => {
        console.log("Successfully added.");
      },
      error:error => console.log(error)
    });
    this.subscriptions.push(subscription);
  }
  onBanqueChange(){
    const selectedBanque = this.beneficiaireForm.get('banque_vcode')?.value;
    if (selectedBanque) {
      this.getBranches(selectedBanque);
    }
  }
}
