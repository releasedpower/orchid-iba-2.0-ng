import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChequierDemandeListeComponent } from './components/chequier-demande-liste/chequier-demande-liste.component';
import { ChequierDemandeComponent } from './components/chequier-demande/chequier-demande.component';

const routes: Routes = [
  {path:'chequier-demande',component:ChequierDemandeComponent},
  {path:'chequier-demande-liste',component:ChequierDemandeListeComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChequierRoutingModule { }
