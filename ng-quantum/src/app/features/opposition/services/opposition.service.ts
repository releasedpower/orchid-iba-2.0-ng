import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OppositionService {

  constructor(private httpClient:HttpClient) { }

  getOppositionTypeCheque():Observable<any>{
    return this.httpClient.get<any>(
      `${environment.endpoint}/oppositionTypeCheque`, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
          .set('userId', `${localStorage.getItem('userId')}`)
      })
  }
  getOppositionsByCompte(compteId:any):Observable<any>{
    return this.httpClient.get<any>(
      `${environment.endpoint}/oppositionsByCompte/${compteId}`, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
          .set('userId', `${localStorage.getItem('userId')}`)
      })
  }
  addOpposition(data:any):Observable<any>{
    return this.httpClient.post<any>(
      `${environment.endpoint}/addOpposition`,data, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
          .set('userId', `${localStorage.getItem('userId')}`)
      })
  }
}
