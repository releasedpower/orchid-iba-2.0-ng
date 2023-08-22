import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChequierService {

  constructor(private cookieService: CookieService, private httpClient: HttpClient) { }
  getDemandesChequier(cpt_iid:string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get('token'),
        'clt_vcode' : this.cookieService.get('clt_vcode')
      })
    };
    return this.httpClient.get(`${environment.endpoint}/demandes-chequier/${cpt_iid}`,httpOptions);
  }
}
