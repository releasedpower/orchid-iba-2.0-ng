import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BeneficiaireService {

  constructor(private httpClient:HttpClient) { }
  addBeneficiaire(data: any): Observable<any> {
    return this.httpClient.post<any>(
      `${environment.endpoint}/addBeneficiaire`, data ,{
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
          .set('userId', `${localStorage.getItem('userId')}`)
      });
  };

  deleteBeneficiaire(id: any): Observable<any> {
    return this.httpClient.delete<any>(
      `${environment.endpoint}/deleteBeneficiaire/${id}`,{
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
          .set('userId', `${localStorage.getItem('userId')}`)
      });
  };

  getBeneficiaires() {
    return this.httpClient.get<any>(
      `${environment.endpoint}/beneficiaires/${localStorage.getItem('userId')}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
        .set('userId', `${localStorage.getItem('userId')}`)
    })
  }
  getBeneficiaireById(id:any):Observable<any>{
    return this.httpClient.get<any>(
      `${environment.endpoint}/beneficiaireById/${id}`, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
          .set('userId', `${localStorage.getItem('userId')}`)
      })
  }

  searchBeneficiaire(term:string):Observable<any>{
    if(term){
      return this.httpClient.get<any>(
        `${environment.endpoint}/searchBeneficiaire/${term}/${localStorage.getItem('userId')}`, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
          .set('userId', `${localStorage.getItem('userId')}`)
      })
    }
    return this.getBeneficiaires();
  }
}
