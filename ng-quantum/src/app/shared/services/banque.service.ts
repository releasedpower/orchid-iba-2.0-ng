import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BanqueService {

  constructor(private httpClient:HttpClient) { }

  getBanques():Observable<any>{
    return this.httpClient.get(`${environment.endpoint}/banques`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
        .set('userId', `${localStorage.getItem('userId')}`)
    });
  }
  getAgences(banqueId:any):Observable<any>{
    return this.httpClient.get(`${environment.endpoint}/agences/${banqueId}`,{
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
        .set('userId', `${localStorage.getItem('userId')}`)
    });
  }
}
