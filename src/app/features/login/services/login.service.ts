import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { environment } from 'src/environments/environment';
// import { environment } from 'src/environments/environment.prod';

import { ClientService } from 'src/app/shared/services/client.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private isOtpAuthenticated: boolean = false;

  constructor(private httpClient: HttpClient, 
      private cookieService: CookieService, 
      private tokenService: TokenService,
    ) { }
    
  setisOtpAuthenticated(value: boolean): void {
    this.isOtpAuthenticated = value;
  }

  getisOtpAuthenticated(): boolean {
    return this.isOtpAuthenticated;
  }
  login(data:any):Observable<any>{
    return this.httpClient.post(`${environment.endpoint}/login`,data, {withCredentials: true});
  }

  isAuthenticated(){
    const token = this.cookieService.get('token');
    const expDate = this.tokenService.getExpiration();
    if (expDate && token) {
      if (!token || new Date(expDate) < new Date()) {
        return false;
      } else return true
    } 
    else return false; 
  }

  verifyOtp(clt_vcode:string, otp:string){
    return this.httpClient.post(`${environment.endpoint}/verifyOtp/${clt_vcode}/${otp}`, {withCredentials: false});
  }
  generateOtp(clt_vcode:string){
    return this.httpClient.post(`${environment.endpoint}/generateOtp/${clt_vcode}`, {withCredentials: false});
  }
}
