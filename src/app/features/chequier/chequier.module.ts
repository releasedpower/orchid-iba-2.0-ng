import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChequierRoutingModule } from './chequier-routing.module';
import { HistoriqueChequierComponent } from './components/historique-chequier/historique-chequier.component';
import { CommandeChequierComponent } from './components/commande-chequier/commande-chequier.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared/shared.module';


@NgModule({
  declarations: [
    HistoriqueChequierComponent,
    CommandeChequierComponent
  ],
  imports: [
    CommonModule,
    ChequierRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class ChequierModule { }
