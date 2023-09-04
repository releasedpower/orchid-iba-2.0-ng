import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LoginTwofactComponent } from './components/login-twofact/login-twofact.component';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'login-2fa',component:LoginTwofactComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
