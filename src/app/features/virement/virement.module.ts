import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VirementRoutingModule } from './virement-routing.module';
import { VirementComponent } from './components/virement/virement.component';
import { ReactiveFormsModule } from '@angular/forms';
import { VirementConfirmationComponent } from './components/virement-confirmation/virement-confirmation.component';
import { VirperListeComponent } from './components/virper-liste/virper-liste.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';

@NgModule({
  declarations: [
    VirementComponent,
    VirementConfirmationComponent,
    VirperListeComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VirementRoutingModule,
    SharedModule
  ]
})
export class VirementModule { }
