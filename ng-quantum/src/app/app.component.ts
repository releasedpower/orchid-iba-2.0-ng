import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './core/auth/auth.service';
import { TokenService } from './core/auth/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'ib-quantum-restruct';
  
  constructor(private router:Router,private auth:AuthService,private tokenService:TokenService){
  }
  isOnLogin(){
    if(this.router.url=='/login'){
      return true;
    }
    else return false;
  }
  checkIfLoggedIn(){
    if(this.tokenService.getAccessToken!=null){
      this.router.navigateByUrl('/dashboard')
    }
    if(this.tokenService.getAccessToken==null){
      this.router.navigateByUrl('/login')
    }
  }
}
