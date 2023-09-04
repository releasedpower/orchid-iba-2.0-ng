import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { LoginTwofactComponent } from './components/login-twofact/login-twofact.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    LoginTwofactComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule
  ]
})
export class LoginModule { }
