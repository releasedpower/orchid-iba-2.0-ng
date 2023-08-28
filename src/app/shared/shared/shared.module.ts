import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { DateToFrenchPipe } from '../pipes/date-to-french.pipe';


@NgModule({
  declarations: [
    DateToFrenchPipe
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
  ],
  exports:[
    DateToFrenchPipe
  ]
})
export class SharedModule { }
