import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { TokenService } from 'src/app/core/auth/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  recaptchaResponse: string|undefined;
  loading=false;
  isLoginIncorrect=false;
  isErreurServeur=false;
  isTryingToLogWithoutCaptcha=false;
  digits:any;
  mdpValue:any;

  loginForm =  new FormGroup({
    identifiant: new FormControl('742159',[Validators.required,Validators.maxLength(6)]),
    mdp: new FormControl('',[Validators.required,Validators.maxLength(6)])
  });
  constructor(private auth: AuthService,private tokenService: TokenService, private router: Router) {
   }

  ngOnInit(): void {
    if(this.tokenService.getAccessToken()!=null || !this.tokenService.isTokenExpired()){
      this.router.navigateByUrl('/dashboard');
    }
    this.digits=this.randomUniqueNum(12,12);
  }
  resolved(captchaResponse: string) {
    this.recaptchaResponse = captchaResponse;
    console.log(this.recaptchaResponse);
  }

  onLoginClick(){
    if(this.recaptchaResponse && this.loginForm.value){
      this.loading=true;
      this.auth.login(this.loginForm.value).subscribe({
        next: result =>{
          this.loading=false;
          this.tokenService.storeLogin(result);
          this.auth.changeIsLoggedIn(true);
          this.router.navigateByUrl('/dashboard');
        },
        error: error => {
          this.loading=false;
          if(error.status === 0){
            this.isErreurServeur=true;
          }
          else this.isLoginIncorrect=true;
        }
      })
    }
    if(!this.recaptchaResponse){
      this.isTryingToLogWithoutCaptcha=true;
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
