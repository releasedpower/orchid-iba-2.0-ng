import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VirementRoutingModule } from './virement-routing.module';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VirementComponent } from './components/virement/virement.component';
import { VirementListeComponent } from './components/virement-liste/virement-liste.component';
import { AddSpacesPipe } from 'src/app/shared/pipes/addspaces';

@NgModule({
  declarations: [
    VirementComponent,
    VirementListeComponent
  ],
  imports: [
    CommonModule,
    VirementRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class VirementModule { }
