import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieDict } from 'ngx-cookie';
import { CookieService } from 'ngx-cookie-service';
import { ClientService } from 'src/app/shared/services/client.service';
import { DataSharingService } from 'src/app/shared/services/data-sharing.service';

@Component({
  selector: 'app-add-email',
  templateUrl: './add-email.component.html',
  styleUrls: ['./add-email.component.css']
})
export class AddEmailComponent implements OnInit {
  emailExistsError=false;
  constructor(private clientService: ClientService,private router: Router,private cookieService:CookieService,
    private dataSharingService: DataSharingService) { }
  addEmailForm = new FormGroup({
    clt_vmail : new FormControl(''),
    clt_vmdp: new FormControl(''),
    clt_vcode: new FormControl(this.cookieService.get('clt_vcode'))
  });
  ngOnInit(): void {
  }
  updateEmail() {
    if (this.addEmailForm.value) {
      this.dataSharingService.setFormData(this.addEmailForm.get('clt_vmail')?.value);
      this.clientService.updateMail(this.addEmailForm.value).subscribe({
        next: (result) => {
          console.log(result);
          this.router.navigateByUrl('email-twofa');
        },
        error: (error) => {
          console.log(error);
          if (error.status === 400) {
            this.emailExistsError = true;
          }
        }
      });
    }
    else console.log('no email');
  }
}
