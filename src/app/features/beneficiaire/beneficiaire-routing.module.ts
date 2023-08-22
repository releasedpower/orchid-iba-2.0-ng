import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutBeneficiaireComponent } from './component/ajout-beneficiaire/ajout-beneficiaire.component';
import { BeneficiairesComponent } from './component/beneficiaires/beneficiaires.component';

const routes: Routes = [
  {path:'beneficiaire',component:AjoutBeneficiaireComponent},
  {path:'beneficiaires',component:BeneficiairesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeneficiaireRoutingModule { }
