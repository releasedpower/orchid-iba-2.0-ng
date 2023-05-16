import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }
  storeLogin(data:any){
    this.setLocalStorage(data);
  }
  getAccessToken()
  {
    return localStorage.getItem('accessToken');
  }
  isTokenExpired(){
    const str = localStorage.getItem('expirationDate');
    let strDate=null;
    if(str!=null){
      strDate= new Date(str);
      if(strDate<new Date()){
        return true;
      }
    }
    return false;
  }

  setLocalStorage(data:any){
    localStorage.setItem('accessToken',data.accessToken);
    localStorage.setItem('expirationDate',data.expirationDate);
    localStorage.setItem('userId',data.userId);
    localStorage.setItem('userLogin',data.userLogin);
    localStorage.setItem('clientIp',data.clientIp);
  }
  unsetLocalStorage(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userLogin');
    localStorage.removeItem('expirationDate');
  }

  isValid()
  {
    let expirationDate=String(localStorage.getItem('expirationDate'));
    if(this.getAccessToken()){
      return new Date()> new Date(expirationDate) ? false : true;
    }
    return false;
  }
}
