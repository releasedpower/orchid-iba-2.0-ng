import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';
import { VirementService } from '../../services/virement.service';
import { AddSpacesPipe } from 'src/app/shared/pipes/addspaces';

@Component({
  selector: 'app-virement-liste',
  templateUrl: './virement-liste.component.html',
  styleUrls: ['./virement-liste.component.css']
})
export class VirementListeComponent implements OnInit {

  virements:any = [];
  comptes:any;
  selectedCompte:any;
  constructor(private userService:UserService, private virementService:VirementService) { }

  async ngOnInit(): Promise<void> {
    await this.getComptes();
    this.getVirementsByCompte(this.comptes[0].cpt_vcode);
  }

  getVirementsByCompte(codeCpt:any){
    this.virementService.getVirementsByCompte(codeCpt).subscribe({
      next:result =>{
        this.virements = result;
        console.log(this.virements);
      }
    });
  }
  getComptes(): Promise<void> {
    return new Promise(resolve =>{
      this.userService.getSolde().subscribe({
        next: result => {
          this.comptes = result;
          console.log(this.comptes);
          resolve();
        },
        error: error => {
          console.log(error);
          resolve();
        }
      });
    })
  }
}
