import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandeChequierComponent } from './components/commande-chequier/commande-chequier.component';
import { HistoriqueChequierComponent } from './components/historique-chequier/historique-chequier.component';

const routes: Routes = [
  {path:'chequier-commande',component:CommandeChequierComponent},
  {path:'chequier-historique',component:HistoriqueChequierComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChequierRoutingModule { }
