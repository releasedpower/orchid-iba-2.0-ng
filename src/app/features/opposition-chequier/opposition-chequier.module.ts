import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OppositionChequierRoutingModule } from './opposition-chequier-routing.module';
import { OppositionChequierComponent } from './components/opposition-chequier/opposition-chequier.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { HistoriqueOppositionComponent } from './components/historique-opposition/historique-opposition.component';


@NgModule({
  declarations: [
    OppositionChequierComponent,
    HistoriqueOppositionComponent
  ],
  imports: [
    CommonModule,
    OppositionChequierRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
  ]
})
export class OppositionChequierModule { }
