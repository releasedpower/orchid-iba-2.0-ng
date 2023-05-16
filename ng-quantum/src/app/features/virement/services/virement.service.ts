import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VirementService {

  constructor(private httpClient:HttpClient) { }

  addVirement(data:any):Observable<any>{
    return this.httpClient.post<any>(
      `${environment.endpoint}/addVirement`,data, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
          .set('userId', `${localStorage.getItem('userId')}`)
      })
  }
  getVirementsByCompte(codeCpt:any){
    return this.httpClient.get<any>(
      `${environment.endpoint}/virementsByCompte/${codeCpt}`, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
          .set('userId', `${localStorage.getItem('userId')}`)
      })
  }
}
