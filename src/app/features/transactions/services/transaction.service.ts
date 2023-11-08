import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
// import { environment } from 'src/environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private httpClient : HttpClient, private cookieService:CookieService) { }


  getTransRecentes(cpt_vcode:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get('token'),
        'clt_vcode' : this.cookieService.get('clt_vcode')
      })
    };
    return this.httpClient.get(`${environment.endpoint}/compte/transactions/${cpt_vcode}`,httpOptions);
  }
  getTransactions(cpt_vcode:string, pageNumber:number):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get('token'),
        'clt_vcode' : this.cookieService.get('clt_vcode')
      })
    };
    return this.httpClient.get(`${environment.endpoint}/transactionsPagination/${cpt_vcode}/${pageNumber}/20`,httpOptions);
  }
  getDepensesDuMois(cpt_vcode:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get('token'),
        'clt_vcode' : this.cookieService.get('clt_vcode')
      })
    };
    return this.httpClient.get(`${environment.endpoint}/transactions/depensesDuMois/${cpt_vcode}`,httpOptions);
  }
  getDepenses5Mois(cpt_vcode:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get('token'),
        'clt_vcode' : this.cookieService.get('clt_vcode')
      })
    };
    return this.httpClient.get(`${environment.endpoint}/depenses5Mois/${cpt_vcode}`,httpOptions);
  }
  getRevenus5Mois(cpt_vcode:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get('token'),
        'clt_vcode' : this.cookieService.get('clt_vcode')
      })
    };
    return this.httpClient.get(`${environment.endpoint}/revenus5Mois/${cpt_vcode}`,httpOptions);
  }
  getRevenusDuMois(cpt_vcode:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get('token'),
        'clt_vcode' : this.cookieService.get('clt_vcode')
      })
    };
    return this.httpClient.get(`${environment.endpoint}/transactions/revenusDuMois/${cpt_vcode}`,httpOptions);
  }
  
  updateSolde(cpt_vcode:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get('token'),
        'clt_vcode' : this.cookieService.get('clt_vcode')
      })
    };
    return this.httpClient.get(`${environment.endpoint}/transactions/updateSolde/${cpt_vcode}`,httpOptions);
  }
  getTransactionsDate(cpt_vcode:any,debut:any,fin:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get('token'),
        'clt_vcode' : this.cookieService.get('clt_vcode')
      })
    };
    return this.httpClient.get(`${environment.endpoint}/transactions/${cpt_vcode}/${debut}/${fin}`,httpOptions);
  }
  getTransactionsDatePDF(cpt_vcode: any, debut: any, fin: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.cookieService.get('token'),
        'clt_vcode': this.cookieService.get('clt_vcode')
      }),
      responseType: 'blob' as 'json'
    };
    return this.httpClient.get(`${environment.endpoint}/transactionsPDF/${cpt_vcode}/${debut}/${fin}`, httpOptions);
  }

}
