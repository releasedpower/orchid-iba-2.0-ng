import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingsComponent } from './components/settings/settings.component';
import { PasswordComponent } from './components/password/password.component';
import { EmailComponent } from './components/email/email.component';
import { AddEmailComponent } from './components/add-email/add-email.component';

const routes: Routes = [
  {path:'settings',component:SettingsComponent},
  {path:'settings/pwd',component:PasswordComponent},
  {path:'settings/email',component:EmailComponent},
  {path:'settings/add-email',component:AddEmailComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
