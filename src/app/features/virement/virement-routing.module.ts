import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VirementComponent } from './components/virement/virement.component';
import { VirementConfirmationComponent } from './components/virement-confirmation/virement-confirmation.component';

const routes: Routes = [
  {path:'virement',component:VirementComponent},
  {path:'virement-confirmation',component:VirementConfirmationComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirementRoutingModule { }
