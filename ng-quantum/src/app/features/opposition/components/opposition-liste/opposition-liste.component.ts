import { Component, OnInit } from '@angular/core';
import { OppositionService } from '../../services/opposition.service';

@Component({
  selector: 'app-opposition-liste',
  templateUrl: './opposition-liste.component.html',
  styleUrls: ['./opposition-liste.component.css']
})
export class OppositionListeComponent implements OnInit {

  oppositions:any = [];
  constructor(private oppositionService:OppositionService) { }

  ngOnInit(): void {
    this.getOppositionsByCompte('01151100001');
  }

  getOppositionsByCompte(compteId:any){
    this.oppositionService.getOppositionsByCompte(compteId).subscribe({
      next: result => {
        this.oppositions = result;
      },
      error: error =>{
        console.log(error);
      }
    });
  }

}
