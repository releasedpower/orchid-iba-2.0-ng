import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OppositionListeComponent } from './components/opposition-liste/opposition-liste.component';
import { OppositionComponent } from './components/opposition/opposition.component';

const routes: Routes = [
  {path:'opposition-nouveau',component:OppositionComponent},
  {path:'oppositions',component:OppositionListeComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OppositionRoutingModule { }
