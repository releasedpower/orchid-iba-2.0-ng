import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ClientService } from 'src/app/shared/services/client.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  isChangePwdVisible=false;
  isChangeEmailVisible=false;
  isAjoutEmailVisible=true;
  subscriptions:Subscription[] = [];
  noEmail = true;
  constructor(private clientService:ClientService) { }

  ngOnInit(): void {
    this.checkEmail();
  }
  ngOnClose(){
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
  onChangePwdClick(){
    this.isChangePwdVisible=true;
    this.isChangeEmailVisible=false;

    console.log(this.isChangeEmailVisible);
    console.log(this.isChangePwdVisible);
  }
  onChangeEmailClick(){
    this.isChangePwdVisible=false;
    this.isChangeEmailVisible=true;
    console.log(this.isChangeEmailVisible);
    console.log(this.isChangePwdVisible);
  }
  checkEmail(){
    const subscription = this.clientService.getEmail().subscribe({
      next: (result) => {
        if(!result.email){
          this.noEmail = true;
        }
        else if(result.email){
          this.noEmail = false;
        }
      },
      error: (error) =>console.log(error)
    });
    this.subscriptions.push(subscription);
  }
}
