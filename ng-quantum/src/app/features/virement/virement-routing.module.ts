import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VirementListeComponent } from './components/virement-liste/virement-liste.component';
import { VirementComponent } from './components/virement/virement.component';

const routes: Routes = [
  {path:'virement-nouveau',component:VirementComponent},
  {path:'virements',component:VirementListeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirementRoutingModule { }
