import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginComponent } from './components/login/login.component';
import { LoginRoutingModule } from './login-routing.module';
import { RECAPTCHA_SETTINGS, RecaptchaFormsModule, RecaptchaModule, RecaptchaSettings } from 'ng-recaptcha';
import { environment } from 'src/environments/environment';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TwoFactorAuthComponent } from './components/two-factor-auth/two-factor-auth.component';


@NgModule({
  declarations: [
    LoginComponent,
    TwoFactorAuthComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: RECAPTCHA_SETTINGS,
      useValue: {
        siteKey: environment.recaptcha.siteKey,
      } as RecaptchaSettings,
    },
  ],
})
export class LoginModule { }
