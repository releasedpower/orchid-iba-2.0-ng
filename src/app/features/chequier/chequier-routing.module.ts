import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandeChequierComponent } from './components/commande-chequier/commande-chequier.component';
import { HistoriqueChequierComponent } from './components/historique-chequier/historique-chequier.component';
import { AuthGuard } from 'src/app/guard/auth.guard';

const routes: Routes = [
  {path:'chequier-commande',component:CommandeChequierComponent,canActivate:[AuthGuard]},
  {path:'chequier-historique',component:HistoriqueChequierComponent,canActivate:[AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChequierRoutingModule { }
