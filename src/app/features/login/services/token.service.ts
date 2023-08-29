import { Injectable } from '@angular/core';

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
