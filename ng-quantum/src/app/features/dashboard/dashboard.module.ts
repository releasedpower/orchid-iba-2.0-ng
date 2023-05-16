import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { AddSpacesPipe } from 'src/app/shared/pipes/addspaces';
import { ReleveComponent } from './components/releve/releve.component';
import { GestionComptesComponent } from './components/gestion-comptes/gestion-comptes.component';

@NgModule({
  declarations: [
    DashboardComponent,
    AddSpacesPipe,
    ReleveComponent,
    GestionComptesComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule
  ]
})
export class DashboardModule { }
