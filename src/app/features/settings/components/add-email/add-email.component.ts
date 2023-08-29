import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ClientService } from 'src/app/shared/services/client.service';

@Component({
  selector: 'app-add-email',
  templateUrl: './add-email.component.html',
  styleUrls: ['./add-email.component.css']
})
export class AddEmailComponent implements OnInit {
  emailExistsError=false;
  constructor(private clientService: ClientService) { }
  addEmailForm = new FormGroup({
    clt_vmail : new FormControl('rrahajary@gmail.com')
  });
  ngOnInit(): void {
  }
  updateEmail() {
    const email = this.addEmailForm.get('clt_vmail')?.value;
    if (email) {
      console.log(email);
      this.clientService.updateMail(email).subscribe({
        next: (result) => {
          console.log(result);
        },
        error: (error) => {
          console.log('Error adding email:', error);
          if (error.status === 400) {
            this.emailExistsError = true;
          }
        }
      });
    }
    else console.log('no email');
  }
}
