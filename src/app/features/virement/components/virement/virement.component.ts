import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { BeneficiaireService } from 'src/app/features/beneficiaire/services/beneficiaire.service';
import { CompteService } from 'src/app/shared/services/compte/compte.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';
import { VirementService } from '../../services/virement.service';
import { Subscription, forkJoin } from 'rxjs';

@Component({
  selector: 'app-virement',
  templateUrl: './virement.component.html',
  styleUrls: ['./virement.component.css']
})
export class VirementComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  isNotFilled = false;
  comptes:any [] = [];
  beneficiaires:any = [] ;
  selectedDate: Date = new Date();
  isVirInterne:boolean = true;
  selectedTypeVirement:string = 'VirementUnique';

  constructor(private compteService: CompteService,
    private beneficiaireService: BeneficiaireService,
    private virementService:VirementService,
    private cookieService: CookieService,
    private dataSharingService : DataSharingService,
    private router: Router){}

  selectedCompte:any ;
  ngOnInit() {
    this.getComptes();
    this.getBeneficiaires();
  }
  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  virementForm = new FormGroup({
    type_virement : new FormControl('',[Validators.required]),
    typetrans_iid :new FormControl('VIR'),
    cpt_iid: new FormControl('',[Validators.required]), //sender
    ben_iid: new FormControl('',[Validators.required]), //receiver
    trans_vmontant: new FormControl('',[Validators.required,Validators.pattern(/^-?\d+(\.\d+)?$/),Validators.min(10000),Validators.max(10000000)]),
    trans_vdescript: new FormControl('',[Validators.required]),
    frequence: new FormControl(''),
    debut: new FormControl(),
    fin: new FormControl(),
  });

  onSubmit(){
    if(this.virementForm.invalid){
      this.isNotFilled = true;
    }
    else{
      let data:any = {
        'type_virement':this.virementForm.get('type_virement')?.value,
        'typetrans_iid': 28,
        'trans_vcodecli' :this.cookieService.get('clt_vcode'),
        'trans_vmontant' : this.virementForm.get('trans_vmontant')?.value,
        'trans_vdescript' : this.virementForm.get('trans_vdescript')?.value,
        'debut':this.virementForm.get('debut')?.value,
        'fin':this.virementForm.get('fin')?.value,
        'sender_banque_vcode' : '',
        'sender_branche_iid' : '',
        'sender_vnumcpt' : '',
        'sender_vclerib' : '',
        'receiver_banque_vcode' : '',
        'receiver_branche_iid' : '',
        'receiver_vnumcpt' : '',
        'receiver_vclerib' : '',
        'frequency':'',
      };
      if (this.virementForm.get('type_virement')?.value === 'VirementPermanent') {
        data.frequency = this.virementForm.get('frequence')?.value;
        const debutDate = new Date(this.virementForm.get('fin')?.value);
        const finDate = new Date(this.virementForm.get('debut')?.value);
        const differenceInTime =  debutDate.getTime() - finDate.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        
        const frequence = this.virementForm.get('frequence')?.value;
        if ((frequence === 'Bimensuel' || frequence === 'Mensuel') && differenceInDays < 60) {
            console.log('Minimum 60 days required for bimensuel or mensuel.');
        } 
        else if (frequence === 'Trimestriel' && differenceInDays < 120) {
            console.log('Minimum 120 days required for trimestriel.');
        } 
      }
        const cpt_iid = this.virementForm.get('cpt_iid')?.value;
        const ben_iid = this.virementForm.get('ben_iid')?.value;
    
        if (cpt_iid && ben_iid) {
        const senderInfo$ = this.virementService.getSenderInfoById(cpt_iid.toString());
        const receiverInfo$ = this.virementService.getReceiverInfoById(ben_iid.toString());
    
        forkJoin([senderInfo$, receiverInfo$]).subscribe(
          ([senderResult, receiverResult]) => {
            data.sender_banque_vcode = senderResult.banque_vcode;
            data.sender_branche_iid = senderResult.branche_iid;
            data.sender_vnumcpt = senderResult.cpt_vcode;
            data.sender_vclerib = senderResult.cpt_vclerib;
      
            data.receiver_banque_vcode = receiverResult.banque_vcode;
            data.receiver_branche_iid = receiverResult.branche_iid;
            data.receiver_vnumcpt = receiverResult.ben_vnumcpt;
            data.receiver_vclerib = receiverResult.ben_vclerib;
      
            this.dataSharingService.setFormData(data);
            this.router.navigateByUrl('virement-confirmation');
          },
          error => console.log(error)
        );
      }
    }
  }
  getComptes(){
     const subscription = this.compteService.getComptes().subscribe({
      next:(result)=>{
        this.comptes=result;
      },
      error:(error)=>{
        console.log(error);
      }
    });
    this.subscriptions.push(subscription);
  }
  getBeneficiaires(){
    const subscription = this.beneficiaireService.getBeneficiaires(this.cookieService.get('clt_vcode')).subscribe({
      next: (result) => {
        this.beneficiaires = result;
      },
      error: (error)=>console.log(error)
    });
    this.subscriptions.push(subscription);
  }
}
