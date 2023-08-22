import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';
import { LoginService } from '../../services/login.service';
import {CookieService} from 'ngx-cookie-service';
import {filter} from 'rxjs/operators';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  digits:any;
  mdpValue:any;
  errorMessage:string = '';

  constructor(private router: Router, 
      private loginService: LoginService, 
      private cookieService:CookieService,
      private tokenService: TokenService
    ) {
  }

  loginForm =  new FormGroup({
    clt_vlogin: new FormControl('684709',[Validators.required,Validators.maxLength(6),Validators.minLength(6)]),
    clt_vmdp: new FormControl('155677',[Validators.required,Validators.maxLength(6),Validators.minLength(6)])
  });

  ngOnInit(): void {
    const token = this.cookieService.get('token');
      if (token) {
      this.router.navigateByUrl('/dashboard');
    }
    this.digits = this.randomUniqueNum(12, 12);
  }

  onLoginClick() {
    if (this.loginForm.value) {
      this.loginService.login(this.loginForm.value).subscribe({
        next: (result) => {
          this.tokenService.storeExpiration(result.expiration);
          this.router.navigateByUrl('/dashboard');
        },
        error: (error) => {
          console.log(error);
          this.errorMessage = error.error.message;
        },
      });
    }
  }

  @ViewChild('mdpField') private mdpField:any;
  insertDigit(item:any)
  {
    this.mdpField.nativeElement.focus();
    let startPos = this.mdpField.nativeElement.selectionStart;
    let value = this.mdpField.nativeElement.value;
    if(this.mdpField.nativeElement.value.length<6){
      this.mdpField.nativeElement.value=value.substring(0, startPos) +item + value.substring(startPos, value.length);
      this.mdpValue=this.mdpField.nativeElement.value; //Valeur variable
    }
    if (value.length>6) {
      this.mdpField.nativeElement.value='';
    }
  }
  resetDigit(event: MouseEvent)
  {
    event.preventDefault();
    this.mdpField.nativeElement.focus();
    let startPos = this.mdpField.nativeElement.selectionStart;
    let value = this.mdpField.nativeElement.value;
    this.mdpField.nativeElement.value=value.substring(0,startPos).slice(0,-1);
    this.mdpValue=this.mdpField.nativeElement.value;
  }
  randomUniqueNum(range:any, outputCount:any) {
    let arr = []
    for (let i = 0; i <= range; i++) {
      if (i>=10) {
        arr.push('');
      }
      else arr.push(i)
    }
    let result = [];
    for (let i = 1; i <= outputCount; i++) {
      const random = Math.floor(Math.random() * (range - i));
      result.push(arr[random]);
      arr[random] = arr[range - i];
    }
    return result;
  }
}
