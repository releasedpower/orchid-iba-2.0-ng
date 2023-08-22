import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirementRoutingModule } from './virement-routing.module';
import { VirementComponent } from './components/virement/virement.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VirementConfirmationComponent } from './components/virement-confirmation/virement-confirmation.component';

@NgModule({
  declarations: [
    VirementComponent,
    VirementConfirmationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VirementRoutingModule
  ]
})
export class VirementModule { }
