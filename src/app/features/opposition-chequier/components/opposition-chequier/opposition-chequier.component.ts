import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CompteService } from 'src/app/shared/services/compte/compte.service';
import { OppositionService } from '../../services/opposition.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-opposition-chequier',
  templateUrl: './opposition-chequier.component.html',
  styleUrls: ['./opposition-chequier.component.css']
})
export class OppositionChequierComponent implements OnInit {

  constructor(private compteService: CompteService, private oppositionService: OppositionService,
    private router:Router) { }
  comptes:any = [];
  selectedTypeCheque:any='signed';

  oppositionChequierForm = new FormGroup({
    oppchq_cpt_iid: new FormControl(''),
    oppchq_vtype: new FormControl(''),
    oppchq_inumdeb: new FormControl(''),
    oppchq_inumfin: new FormControl(''),
    oppchq_vmontant: new FormControl(''),
    oppchq_vmotif: new FormControl(''),
    oppchq_dperte: new FormControl('')

  });

  ngOnInit(): void {
    this.getComptes();
  }
  getComptes(){
    this.compteService.getComptes().subscribe({
      next:(result) => {
        this.comptes = result;
      },
      error:(error) => console.log(error)
    });
  }
  onClickOpposition(){
    if(this.selectedTypeCheque === 'Signed'){
      this.oppositionService.insertOppositionSigned(this.oppositionChequierForm.value).subscribe({
        next: () => {
          this.router.navigateByUrl('chequier-opposition-historique')
        },
        error: error => console.log(error)
      })
    }
    else if(this.selectedTypeCheque === 'Unsigned'){
      this.oppositionService.insertOppositionUnsigned(this.oppositionChequierForm.value).subscribe({
        next: () => this.router.navigateByUrl('chequier-opposition-historique'),
        error: error => console.log(error)
      })
    }
    console.log(this.oppositionChequierForm.value);
  }
}
