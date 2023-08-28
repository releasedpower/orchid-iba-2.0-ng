import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeneficiaireRoutingModule } from './beneficiaire-routing.module';
import { BeneficiairesComponent } from './component/beneficiaires/beneficiaires.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { AjoutBeneficiaireComponent } from './component/ajout-beneficiaire/ajout-beneficiaire.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    BeneficiairesComponent,
    AjoutBeneficiaireComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BeneficiaireRoutingModule,
    SharedModule
  ]
})
export class BeneficiaireModule { }
