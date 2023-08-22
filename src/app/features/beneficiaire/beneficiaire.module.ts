import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BeneficiaireRoutingModule } from './beneficiaire-routing.module';
import { BeneficiairesComponent } from './component/beneficiaires/beneficiaires.component';


@NgModule({
  declarations: [
    BeneficiairesComponent
  ],
  imports: [
    CommonModule,
    BeneficiaireRoutingModule
  ]
})
export class BeneficiaireModule { }
