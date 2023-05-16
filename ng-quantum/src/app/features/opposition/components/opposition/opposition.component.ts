import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { OppositionService } from '../../services/opposition.service';

@Component({
  selector: 'app-opposition',
  templateUrl: './opposition.component.html',
  styleUrls: ['./opposition.component.css']
})
export class OppositionComponent implements OnInit {

  constructor(private userService:UserService, private oppositionService:OppositionService) { }

  comptes:any;
  oppositionTypeCheques:any = [];

  selectedTypeCheque:any;
  signe=true;
  vierge=false;

  oppositionForm = new FormGroup({

  });

  ngOnInit(): void {
    this.getOppositionTypeCheque();
    this.getComptes();
  }
  getComptes() {
    this.userService.getSolde().subscribe({
      next: result => this.comptes = result,
      error: error => console.log(error)
    })
  };
  getOppositionTypeCheque(){
    this.oppositionService.getOppositionTypeCheque().subscribe({
      next: result => {
        this.oppositionTypeCheques = result;
      },
      error: error => console.log(error)
    });
  }
  changeSelectedType(){
    if(this.selectedTypeCheque==="SIGNE"){
      this.signe=true;
      this.vierge=false;
    }
    else {
      this.signe=false;
      this.vierge=true;
    }
  }
}
