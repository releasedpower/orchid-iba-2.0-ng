import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ClientService } from 'src/app/shared/services/client.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';

@Component({
  selector: 'app-two-fa-email',
  templateUrl: './two-fa-email.component.html',
  styleUrls: ['./two-fa-email.component.css']
})
export class TwoFaEmailComponent implements OnInit {

  constructor(private clientService:ClientService, private cookieService: CookieService, private router:Router,
    private dataSharingService: DataSharingService) { }
  twoFaCode:any;
  formData:any;
  ngOnInit(): void {
    this.formData=this.dataSharingService.getFormData();
  }
  onSubmit(){
    this.confirmOtp();
  }
  confirmOtp() {
    if (this.twoFaCode) {
      const data = {
        'otp' : this.twoFaCode,
        'clt_vmail': this.formData,
        'clt_vcode':this.cookieService.get('clt_vcode')
      }
      this.clientService.confirmMail(data).subscribe({
        next: (result) => {
          console.log(result);
          this.router.navigateByUrl('settings');
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
    else console.log('no otp');
  }
}
