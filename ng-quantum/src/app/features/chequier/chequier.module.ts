import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChequierRoutingModule } from './chequier-routing.module';
import { ChequierDemandeComponent } from './components/chequier-demande/chequier-demande.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ChequierDemandeListeComponent } from './components/chequier-demande-liste/chequier-demande-liste.component';

@NgModule({
  declarations: [
    ChequierDemandeComponent,
    ChequierDemandeListeComponent
  ],
  imports: [
    CommonModule,
    ChequierRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ChequierModule { }
 