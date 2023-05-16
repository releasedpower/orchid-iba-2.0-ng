import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeneficiaireRoutingModule } from './beneficiaire-routing.module';
import { BeneficiaireListeComponent } from './components/beneficiaire-liste/beneficiaire-liste.component';
import { BeneficiaireNouveauComponent } from './components/beneficiaire-nouveau/beneficiaire-nouveau.component';
import { BeneficiaireEditComponent } from './components/beneficiaire-edit/beneficiaire-edit.component';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
// import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    BeneficiaireListeComponent,
    BeneficiaireNouveauComponent,
    BeneficiaireEditComponent,
  ],
  imports: [
    CommonModule,
    BeneficiaireRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    // MatDialogModule
  ]
})
export class BeneficiaireModule { }
