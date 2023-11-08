import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/shared/services/client.service';
import { timer } from 'rxjs';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  private subscriptions: Subscription[] = [];
  unmatchingPin = false;
  ok = false;
  constructor(private clientService: ClientService, private router:Router,private cookieService:CookieService) { }

  pinChangeForm = new FormGroup({
    currentPin: new FormControl('',Validators.required),
    newPin1: new FormControl('', Validators.required),
    newPin2: new FormControl('',Validators.required),
    clt_vcode : new FormControl(this.cookieService.get('clt_vcode').toString())
  });

  ngOnInit(): void {
  }
  ngOnDestroy(){
    this.subscriptions.forEach(sub => sub.unsubscribe);
  }
  changeMdp(){
    if(this.pinChangeForm.get('newPin1')?.value == this.pinChangeForm.get('newPin2')?.value){
      const subscription = this.clientService.updateMdp(this.pinChangeForm.value).subscribe({
        next: (result) => {
          console.log(result);
          this.ok = true;   
          timer(2000).subscribe(() => {
            this.router.navigate(['/settings']);
          });
        },
        error:error => console.log(error)
      });
      this.subscriptions.push(subscription);
    }
    else this.unmatchingPin = true;
  }
}
