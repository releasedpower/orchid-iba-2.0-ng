import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  storeExpiration(exp:string){
    localStorage.setItem('expiration',exp);
  }
  getExpiration(){
    return localStorage.getItem('expiration');
  }
  unsetExpiration(){
    localStorage.removeItem('expiration');
  }
}
