import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BeneficiaireService } from '../../beneficiaire/services/beneficiaire.service';

@Injectable({
  providedIn: 'root'
})
export class VirementService {

  constructor(private httpClient : HttpClient, private cookieService:CookieService, private beneficiaireService:BeneficiaireService) { }

  getSenderInfoById(cpt_iid:string):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get('token'),
        'clt_vcode' : this.cookieService.get('clt_vcode')
      })
    };
    return this.httpClient.get(`${environment.endpoint}/compte/${cpt_iid}`,httpOptions);
  }
  getReceiverInfoById(ben_iid:string):Observable<any>{
    return this.beneficiaireService.getBeneficiaireById(ben_iid);
  }

  insertVirement(data:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get('token'),
        'clt_vcode' : this.cookieService.get('clt_vcode')
      })
    };
    return this.httpClient.post(`${environment.endpoint}/virement`,data,httpOptions);
  }
}
