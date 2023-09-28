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
  twoFaCode = '';
  ngOnInit(): void {
    this.loginService.generateOtp(this.cookieService.get('clt_vcode')).subscribe({
      next:()=>{
        console.log('Code OTP envoyé');
      },
      error:()=>{
        this.router.navigateByUrl('login')
      }
    });
    if(this.loginService.getisOtpAuthenticated()){
      this.router.navigateByUrl('dashboard');
    }
  }
  onSubmit(){
    let data = {
      'otp': this.twoFaCode,
      'clt_vcode':this.cookieService.get('clt_vcode')
    };
    this.loginService.verifyOtp(this.cookieService.get('clt_vcode'),this.twoFaCode).subscribe({
      next:result=>{
        this.loginService.setisOtpAuthenticated(true);
        this.router.navigateByUrl('dashboard');
      },
      error:error=>{
        console.log(error);
        this.router.navigateByUrl('login')
      }
    });
  }
}
