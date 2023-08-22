import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient, 
      private cookieService: CookieService, 
      private router: Router,
      private tokenService: TokenService,
    ) { }
    
  login(data:any):Observable<any>{
    return this.httpClient.post(`${environment.endpoint}/login`,data,{withCredentials: true});
  }
  checkTokenAndRedirect() {
    const token = this.cookieService.get('token');
    const expDate = this.tokenService.getExpiration();
    if (expDate) {
      if (!token || new Date(expDate) < new Date()) {
        this.router.navigateByUrl('/login');
      } else {
        this.router.navigateByUrl('/dashboard');
      }
    } else {
      this.router.navigateByUrl('/login');
    }
  }
}
