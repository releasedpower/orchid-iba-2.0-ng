import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
import { PasswordComponent } from './components/password/password.component';
import { EmailComponent } from './components/email/email.component';
import { AddEmailComponent } from './components/add-email/add-email.component';
import { AuthGuard } from 'src/app/guard/auth.guard';

const routes: Routes = [
  {path:'settings',component:SettingsComponent,canActivate:[AuthGuard]},
  {path:'settings/pwd',component:PasswordComponent,canActivate:[AuthGuard]},
  {path:'settings/email',component:EmailComponent,canActivate:[AuthGuard]},
  {path:'settings/add-email',component:AddEmailComponent,canActivate:[AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
