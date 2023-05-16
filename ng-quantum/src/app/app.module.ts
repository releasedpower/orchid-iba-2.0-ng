import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './features/login/login.module';
import {HttpClientModule} from '@angular/common/http';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarModule } from './shared/components/sidebar/sidebar.module';
import { BeneficiaireModule } from './features/beneficiaire/beneficiaire.module';
import { VirementModule } from './features/virement/virement.module';
import { ChequierModule } from './features/chequier/chequier.module';
import { OppositionModule } from './features/opposition/opposition.module';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LoginModule,
    HttpClientModule,
    DashboardModule,
    SidebarModule,
    BeneficiaireModule,
    VirementModule,
    ChequierModule,
    OppositionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
