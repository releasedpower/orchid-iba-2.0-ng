import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VirementComponent } from './components/virement/virement.component';
import { VirementConfirmationComponent } from './components/virement-confirmation/virement-confirmation.component';
import { VirperListeComponent } from './components/virper-liste/virper-liste.component';
import { AuthGuard } from 'src/app/guard/auth.guard';

const routes: Routes = [
  {path:'virement',component:VirementComponent,canActivate:[AuthGuard]},
  {path:'virement-confirmation',component:VirementConfirmationComponent,canActivate:[AuthGuard]},
  {path:'virement-permanent-liste',component:VirperListeComponent,canActivate:[AuthGuard]},
  // {path:'virements-effectues',component:},
  // {path:'virements-permanents',component:},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VirementRoutingModule { }
