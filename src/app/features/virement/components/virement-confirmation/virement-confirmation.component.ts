import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';
import { VirementService } from '../../services/virement.service';

@Component({
  selector: 'app-virement-confirmation',
  templateUrl: './virement-confirmation.component.html',
  styleUrls: ['./virement-confirmation.component.css']
})
export class VirementConfirmationComponent implements OnInit {
  formData:any;
  constructor(private dataSharingService: DataSharingService,
    private router:Router,
    private virementService:VirementService) { }

  ngOnInit(): void {
    this.formData=this.dataSharingService.getFormData();
    console.log(this.formData);
  }
  onSubmit(){
    if(this.formData.type_virement==='VirementUnique'){
      this.virementService.insertVirement(this.formData).subscribe({
        next: () => console.log('ok'),
        error: error => console.log(error)
      })
    }
    else if(this.formData.type_virement==='VirementPermanent'){
      this.virementService.insertVirementPermanent(this.formData).subscribe({
        next: () => console.log('ok'),
        error: error => console.log(error)
      })
    }
  }
  onCancel() {
    console.log('Cancel button clicked');
    this.router.navigateByUrl('virement');
  }
}
