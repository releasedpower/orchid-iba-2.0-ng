import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from './features/login/services/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Internet Banking';
  constructor(private router:Router, private cookieService:CookieService, private loginService: LoginService){
  }
  ngOnInit(): void {
    const expirationDateString = localStorage.getItem('expiration');
    if (expirationDateString){
      const expirationDate = new Date(expirationDateString);

      if (expirationDate < new Date()) {
        this.router.navigateByUrl('login');
      }
    }
    else if ((!expirationDateString) || (!this.cookieService.get('clt_vcode'))){
      this.router.navigateByUrl('login')
    }
  }
  isOnLogin(){
    if (this.router.url==='/login' || this.router.url==='/login-2fa'){
      return true;
    }
    else return false;
  }

}
