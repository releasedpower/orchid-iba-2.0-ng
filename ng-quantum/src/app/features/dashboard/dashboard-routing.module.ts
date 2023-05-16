import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guard/auth.guard';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ReleveComponent } from './components/releve/releve.component';
import { GestionComptesComponent } from './components/gestion-comptes/gestion-comptes.component';

const routes: Routes = [
  {path:'dashboard',component:DashboardComponent,canActivate:[AuthGuard]},
  {path:'releve',component:ReleveComponent,canActivate:[AuthGuard]},
  {path:'gestion-comptes',component:GestionComptesComponent,canActivate:[AuthGuard]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
