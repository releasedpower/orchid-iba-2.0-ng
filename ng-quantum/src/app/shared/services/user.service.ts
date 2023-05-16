import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClient: HttpClient) { }

  getSolde(): Observable<any> {
    return this.httpClient.get<any>(`${environment.endpoint}/solde/${localStorage.getItem('userId')}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
        .set('userId', `${localStorage.getItem('userId')}`)
    })
  };
  getUserInfo(userId:String):Observable<any>{
    return this.httpClient.get<any>(
      `${environment.endpoint}/userInfo/${userId}`,
        {headers: new HttpHeaders()
          .set('Authorization',`Bearer ${localStorage.getItem('accessToken')}`) 
          .set('userId',`${localStorage.getItem('userId')}`)
    })
  }
  getTransactions(compte:any): Observable<any> {
    return this.httpClient.get<any>(
      `${environment.endpoint}/transactionsWithBalance/${compte}`, {
      headers: new HttpHeaders()
        .set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
        .set('userId', `${localStorage.getItem('userId')}`)
    })
  }
  
  getCompteById(id:any):Observable<any>{
    return this.httpClient.get<any>(
      `${environment.endpoint}/compteById/${id}`, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
          .set('userId', `${localStorage.getItem('userId')}`)
      })
  }

  getDepensesMois(id:any):Observable<any>{
    return this.httpClient.get<any>(
      `${environment.endpoint}/depensesMois/${id}`, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
          .set('userId', `${localStorage.getItem('userId')}`)
      })
  }
  getRecettesMois(id:any):Observable<any>{
    return this.httpClient.get<any>(
      `${environment.endpoint}/recettesMois/${id}`, {
        headers: new HttpHeaders()
          .set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
          .set('userId', `${localStorage.getItem('userId')}`)
      })
  }
}
