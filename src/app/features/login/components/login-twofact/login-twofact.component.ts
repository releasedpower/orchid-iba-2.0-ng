import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-twofact',
  templateUrl: './login-twofact.component.html',
  styleUrls: ['./login-twofact.component.css']
})
export class LoginTwofactComponent implements OnInit {

  constructor(private cookieService: CookieService, private loginService:LoginService,
    private router:Router) { }
  twoFaCode = 0;
  ngOnInit(): void {
  }
  onSubmit(){
    let data = {
      'otp': this.twoFaCode,
      'clt_vcode':this.cookieService.get('clt_vcode')
    };
    this.loginService.verifyOtp(data).subscribe({
      next:result=>{
        this.router.navigateByUrl('dashboard');
      },
      error:error=>{
        console.log(error);
        this.router.navigateByUrl('login')
      }
    });
  }
}
