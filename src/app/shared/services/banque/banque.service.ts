import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class BanqueService {

  constructor(private httpClient : HttpClient, private cookieService:CookieService) { }
  getBanques():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get('token'),
        'clt_vcode' : this.cookieService.get('clt_vcode')
      })
    };
    return this.httpClient.get(`${environment.endpoint}/banques`,httpOptions);
  }
}
