import { Component, OnInit } from '@angular/core';
import { VirementService } from '../../services/virement.service';
import { CompteService } from 'src/app/shared/services/compte/compte.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-virper-liste',
  templateUrl: './virper-liste.component.html',
  styleUrls: ['./virper-liste.component.css']
})
export class VirperListeComponent implements OnInit {
  virementsPermanents:any = [];
  selectedRowIndex: number | null = null;
  comptes:any[] = [];
  isLoading = true;
  isEmpty = false;
  isEdited = false;
  constructor(private virementService: VirementService,
    private compteService: CompteService,
    private router: Router) { }

  ngOnInit(): void {
    this.getComptes();
  }

  getVirementsPermanents(cpt_vcode:string){
    this.virementService.getVirementsPermanents(cpt_vcode).subscribe({
      next: (result) => {
        this.virementsPermanents = result;
      },
      error: error => console.log(error)
    });
  }
  getComptes(){
    this.compteService.getComptes().subscribe({
      next: (result) => {
        this.comptes = result;
        this.getVirementsPermanents(this.comptes[0].cpt_vcode);
      },
      complete:()=>{
        this.isLoading=false;
        if(!this.virementsPermanents){
          this.isEmpty = true;
        }
      },
      error:(error) => console.log(error)
    });
  }
  onEdit(rowIndex: number) {
    this.selectedRowIndex = rowIndex;
    this.isEdited = true; // Assuming you want to enable editing mode
  }
  onDelete(virper_iid:string) {
    this.virementService.delete(virper_iid).subscribe({
      next:() => {
        console.log('deleted');
        this.refreshPage();
      },
      error: (error) => console.log(error)
    })
  }
  refreshPage() {
    const currentRoute = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentRoute]);
    });
  }
}
