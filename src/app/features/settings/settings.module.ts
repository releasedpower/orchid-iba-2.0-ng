import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsComponent } from './components/settings/settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailComponent } from './components/email/email.component';
import { PasswordComponent } from './components/password/password.component';
import { AddEmailComponent } from './components/add-email/add-email.component';
import { TwoFaEmailComponent } from './components/two-fa-email/two-fa-email.component';


@NgModule({
  declarations: [
    SettingsComponent,
    EmailComponent,
    PasswordComponent,
    AddEmailComponent,
    TwoFaEmailComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SettingsModule { }
