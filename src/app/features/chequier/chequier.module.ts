import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChequierRoutingModule } from './chequier-routing.module';
import { HistoriqueChequierComponent } from './components/historique-chequier/historique-chequier.component';
import { CommandeChequierComponent } from './components/commande-chequier/commande-chequier.component';


@NgModule({
  declarations: [
    HistoriqueChequierComponent,
    CommandeChequierComponent
  ],
  imports: [
    CommonModule,
    ChequierRoutingModule
  ]
})
export class ChequierModule { }
