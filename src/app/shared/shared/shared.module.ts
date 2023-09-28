import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { DateToFrenchPipe } from '../pipes/date-to-french.pipe';
import { DigitmaskPipe } from '../pipes/digitmask.pipe';


@NgModule({
  declarations: [
    DateToFrenchPipe,
    DigitmaskPipe
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
  ],
  exports:[
    DateToFrenchPipe,
    DigitmaskPipe
  ]
})
export class SharedModule { }
