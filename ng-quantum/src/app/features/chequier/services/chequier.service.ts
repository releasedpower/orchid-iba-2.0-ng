import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChequierService {

  constructor(private httpClient:HttpClient) { }

  getTypeCarnet():Observable<any>{
    return this.httpClient.get<any>(
      `${environment.endpoint}/typeCarnet`, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
          .set('userId', `${localStorage.getItem('userId')}`)
      })
  }
  getTypeChequier():Observable<any>{
    return this.httpClient.get<any>(
      `${environment.endpoint}/typeChequier`, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
          .set('userId', `${localStorage.getItem('userId')}`)
      })
  }
  getDemandesChequierByCompte(compteId:any){
    return this.httpClient.get<any>(
      `${environment.endpoint}/demandesChequierByCompte/${compteId}`, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
          .set('userId', `${localStorage.getItem('userId')}`)
      })
  }
}
