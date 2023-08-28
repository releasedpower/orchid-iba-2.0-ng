import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { LoginComponent } from './features/login/components/login/login.component';
import { LoginModule } from './features/login/login.module';
import { SettingsComponent } from './features/settings/components/settings/settings.component';
import { SettingsModule } from './features/settings/settings.module';
import { ChequierModule } from './features/chequier/chequier.module';
import { HistoriqueOppositionComponent } from './features/opposition-chequier/components/historique-opposition/historique-opposition.component';
import { OppositionChequierModule } from './features/opposition-chequier/opposition-chequier.module';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CookieModule } from 'ngx-cookie';
import { AjoutBeneficiaireComponent } from './features/beneficiaire/component/ajout-beneficiaire/ajout-beneficiaire.component';
import { BeneficiaireModule } from './features/beneficiaire/beneficiaire.module';
import { VirementModule } from './features/virement/virement.module';
import { TransactionsModule } from './features/transactions/transactions.module';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    LoginComponent,
    SettingsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    CookieModule.withOptions(),
    DashboardModule,
    VirementModule,
    LoginModule,
    SettingsModule,
    ChequierModule,
    OppositionChequierModule,
    BeneficiaireModule,
    TransactionsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
