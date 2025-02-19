import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OppositionChequierComponent } from './components/opposition-chequier/opposition-chequier.component';
import { HistoriqueOppositionComponent } from './components/historique-opposition/historique-opposition.component';
import { AuthGuard } from 'src/app/guard/auth.guard';

const routes: Routes = [
  {path:'chequier-opposition',component:OppositionChequierComponent,canActivate:[AuthGuard]},
  {path:'chequier-opposition-historique',component:HistoriqueOppositionComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OppositionChequierRoutingModule { }
