import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BeneficiaireEditComponent } from './components/beneficiaire-edit/beneficiaire-edit.component';
import { BeneficiaireListeComponent } from './components/beneficiaire-liste/beneficiaire-liste.component';
import { BeneficiaireNouveauComponent } from './components/beneficiaire-nouveau/beneficiaire-nouveau.component';

const routes: Routes = [
  {path: 'beneficiaires',component:BeneficiaireListeComponent},
  {path: 'beneficiaire-nouveau',component:BeneficiaireNouveauComponent},
  {path: 'beneficiaire-edit',component:BeneficiaireEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeneficiaireRoutingModule { }
