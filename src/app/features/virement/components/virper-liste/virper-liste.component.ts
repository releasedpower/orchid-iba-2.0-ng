import { Component, OnInit } from '@angular/core';
import { VirementService } from '../../services/virement.service';

@Component({
  selector: 'app-virper-liste',
  templateUrl: './virper-liste.component.html',
  styleUrls: ['./virper-liste.component.css']
})
export class VirperListeComponent implements OnInit {
  virementsPermanents:any = [];
  constructor(private virementService: VirementService) { }

  ngOnInit(): void {
    this.getVirementsPermanents();
  }

  getVirementsPermanents(){
    this.virementService.getVirementsPermanents('00125100001').subscribe({
      next: (result) => {
        this.virementsPermanents = result;
        console.log(this.virementsPermanents);
      },
      error: error => console.log(error)
    });
  }
}
