import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LoginService } from '../features/login/services/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    console.log('URL:', state.url);
  
    if (this.loginService.isAuthenticated() && this.loginService.getisOtpAuthenticated()) {
      return true;
    }  
    if (state.url === '/login-2fa' && this.loginService.isAuthenticated() && this.loginService.getisOtpAuthenticated()) {
      this.router.navigateByUrl('/dashboard');
    }
    
    if(!this.loginService.isAuthenticated()){
      this.router.navigateByUrl('/login');
      return false;
    }
    else if (state.url === '/login' || state.url === '/login-2fa') {
      return this.router.createUrlTree(['/login']);
    } else {
      return true;
    }
  }
  
}