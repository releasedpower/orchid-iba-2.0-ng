import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { LoginService } from '../../services/login.service';
import {CookieService} from 'ngx-cookie-service';
import { TokenService } from '../../services/token.service';
import { ClientService } from 'src/app/shared/services/client.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  digits:any;
  mdpValue:any;
  errorMessage:string = '';
  private subscriptions:Subscription[] = [];
  constructor(private router: Router, 
      private loginService: LoginService, 
      private cookieService:CookieService,
      private tokenService: TokenService,
      private clientService:ClientService
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
  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  async onLoginClick() {
    if (this.loginForm.value) {
      try {
        const result = await this.loginService.login(this.loginForm.value).toPromise();
        this.tokenService.storeExpiration(result.expiration);
        
        const emailCheckResult = await this.checkEmail();
        if (emailCheckResult) {
          this.router.navigateByUrl('login-2fa');
        } else {
          this.router.navigateByUrl('/dashboard');
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
  async checkEmail(): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      const subscription = this.clientService.getEmail().subscribe({
        next: (result) => {
          resolve(!!result.email); // Resolve with true if email exists, otherwise resolve with false
        },
        error: (error) => {
          console.log(error);
          reject(error);
        },
      });
      this.subscriptions.push(subscription);
    });
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
