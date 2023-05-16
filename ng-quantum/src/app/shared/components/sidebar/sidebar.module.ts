import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SidebarRoutingModule } from './sidebar-routing.module';
import { BeneficiaireRoutingModule } from 'src/app/features/beneficiaire/beneficiaire-routing.module';
import { ChequierRoutingModule } from 'src/app/features/chequier/chequier-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SidebarRoutingModule,
    BeneficiaireRoutingModule,
    ChequierRoutingModule
  ]
})
export class SidebarModule { }
