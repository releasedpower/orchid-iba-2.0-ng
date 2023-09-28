import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private httpClient : HttpClient, private cookieService:CookieService) { }
  getEmail():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get('token'),
        'clt_vcode' : this.cookieService.get('clt_vcode')
      })
    };
    return this.httpClient.get(`${environment.endpoint}/client/email/${this.cookieService.get('clt_vcode')}`,httpOptions);
  }
  
  updateMail(email: string): Observable<any> {
    const clt_vcode = this.cookieService.get('clt_vcode').toString();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get('token'),
      })
    };
    const requestBody = { 'clt_vmail': email }; // Use the actual field name expected by Laravel

    return this.httpClient.post(`${environment.endpoint}/client/change-email/${clt_vcode}`, requestBody, httpOptions)
    .pipe(
      catchError((error) => {
        throw error;
      })
    );;
  }

  getClientById(): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get('token'),
        'clt_vcode' : this.cookieService.get('clt_vcode')
      })
    };
    return this.httpClient.get(`${environment.endpoint}/client/${this.cookieService.get('clt_vcode')}`,httpOptions);
  }
}
