import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OppositionChequierRoutingModule } from './opposition-chequier-routing.module';
import { OppositionChequierComponent } from './components/opposition-chequier/opposition-chequier.component';


@NgModule({
  declarations: [
    OppositionChequierComponent
  ],
  imports: [
    CommonModule,
    OppositionChequierRoutingModule
  ]
})
export class OppositionChequierModule { }
