import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OppositionRoutingModule } from './opposition-routing.module';
import { OppositionListeComponent } from './components/opposition-liste/opposition-liste.component';
import { OppositionComponent } from './components/opposition/opposition.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    OppositionComponent,
    OppositionListeComponent,
  ],
  imports: [
    CommonModule,
    OppositionRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OppositionModule { }
