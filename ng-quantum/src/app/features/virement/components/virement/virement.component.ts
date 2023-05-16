import { Component, OnInit, ViewChild } from '@angular/core';
import { BeneficiaireService } from 'src/app/features/beneficiaire/services/beneficiaire.service';
import { UserService } from 'src/app/shared/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { VirementService } from '../../services/virement.service';

@Component({
  selector: 'app-virement',
  templateUrl: './virement.component.html',
  styleUrls: ['./virement.component.css']
})
export class VirementComponent implements OnInit {
  beneficiaireManuel = false;
  userInfo:any;
  loading=true;
  beneficiaires: any;
  soldes: any;
  
  selectedSender:any;
  selectedReceiver:any;

  senderDetails: any;
  receiverDetails: any;

  virementForm = new FormGroup({
    senderForm: new FormControl(''),
    receiverForm: new FormControl(''),
    montantForm: new FormControl(''),
    motifForm: new FormControl(''),
    dateForm: new FormControl(''),
  });

  virement(){
    const vir_vnom = this.userInfo[0].clt_vnom;
    const vir_vprenom = this.userInfo[0].clt_vnom;
  }

  constructor(private virementService:VirementService, private userService: UserService,private beneficiaireService:BeneficiaireService) {
    this.beneficiaires = [];
    this.soldes = [];
  }

  async ngOnInit(): Promise<void> {
    this.getBeneficiaires();
    await this.getSolde();
    this.selectedSender = this.soldes[0];
    console.log(this.soldes[0]);
  }
  getSenderInfo(id:any): Promise<void>{
    return new Promise(resolve =>{
      this.userService.getCompteById(id).subscribe({
        next: result => {
          this.senderDetails = result[0];
          resolve();
        },
        error: error => {
          console.log(error);
          resolve();
        }
      });
    });
  }
  getReceiverInfo(id:any): Promise<void>{
    return new Promise(resolve =>{
      this.beneficiaireService.getBeneficiaireById(id).subscribe({
        next: result => {
          this.receiverDetails = result[0];
          resolve();
        },
        error: error => {
          console.log(error);
          resolve();
        }
      });
    });
  }
  getSolde():Promise<void> {
    return new Promise(resolve =>{
      this.userService.getSolde().subscribe({
        next: result => {
          this.soldes = result;
          resolve();
        },
        error: error => {
          console.log(error);
          resolve();
        }
      })
    })
  };
  getUserInfo(userId:String) {
    this.userService.getUserInfo(userId)
      .subscribe((result: any) => {
        this.userInfo = result;
      });
  }
  getBeneficiaires() {
    this.beneficiaireService.getBeneficiaires().subscribe(result => {
      this.beneficiaires = result || [];
      this.loading = false;
    });
  }
  
  async addVirement(){
    await this.getSenderInfo(this.selectedSender);
    await this.getReceiverInfo(this.selectedReceiver);

    let virementObject = {
      'vir_vcode':`${this.senderDetails.cpt_vcode}`,
      'vir_vbanque':`${this.senderDetails.cpt_vbanque}`,
      'vir_vbranche':`${this.senderDetails.cpt_vbranche}`,
      'vir_vrib':`${this.senderDetails.cpt_vrib}`,
      'vir_ddate':`${this.virementForm.get('dateForm')?.value}`,
      'vir_fmontant':`${this.virementForm.get('montantForm')?.value}`,
      'vir_vcodeute':`${this.senderDetails.cpt_vbranche}`,
      'vir_vmotif':`${this.virementForm.get('motifForm')?.value}`,
      'vir_vnom':`${this.senderDetails.clt_vnom}`,
      'vir_vprenom':`${this.senderDetails.ind_vprenom}`,
      'vir_vcode_benef':`${this.receiverDetails.ben_vcodecpt}`,
      'vir_vbanque_benef':`${this.receiverDetails.ben_vbanquecpt}`,
      'vir_vbranche_benef':`${this.receiverDetails.ben_vbranchecpt}`,
      'vir_vrib_benef':`${this.receiverDetails.ben_vribcpt}`,
      'vir_vnom_benef':`${this.receiverDetails.ben_vnom}`,
      'vir_vprenom_benef':`${this.receiverDetails.ben_vprenom}`
    }

    this.virementService.addVirement(virementObject).subscribe({
      next:result=>{console.log('okay')},
      error:error=>console.log(error)
    });
  }
}
