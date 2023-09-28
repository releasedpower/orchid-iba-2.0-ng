import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AjoutBeneficiaireComponent } from './component/ajout-beneficiaire/ajout-beneficiaire.component';
import { BeneficiairesComponent } from './component/beneficiaires/beneficiaires.component';
import { AuthGuard } from 'src/app/guard/auth.guard';

const routes: Routes = [
  {path:'beneficiaire',component:AjoutBeneficiaireComponent,canActivate:[AuthGuard]},
  {path:'beneficiaires',component:BeneficiairesComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeneficiaireRoutingModule { }
