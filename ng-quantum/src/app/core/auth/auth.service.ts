import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn:boolean=false;

  constructor(private httpClient: HttpClient) { }
  login(data:any):Observable<any>{
    return this.httpClient.post(`${environment.endpoint}/login`,data);
  }
  changeIsLoggedIn(value:boolean){
    this.isLoggedIn=value;
  }
}
