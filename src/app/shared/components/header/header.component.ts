import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from 'src/app/features/login/services/token.service';
import { CompteService } from '../../services/compte/compte.service';
import { ClientService } from '../../services/client.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  client:any;
  constructor(private cookieService:CookieService, 
      private router: Router,
      private tokenService: TokenService,
      private clientService: ClientService
    ) { }

  ngOnInit(): void {
    // $.tree('.sidebar');
    $.pushMenu.activate("[data-toggle='offcanvas']");
    this.getClientById();
  }

  logout(): void {
    this.cookieService.delete('token', '/', 'localhost');
    this.cookieService.delete('clt_vcode', '/', 'localhost');
    this.tokenService.unsetExpiration();
    this.router.navigateByUrl('/login');
  }
  getClientById(){
    this.clientService.getClientById().subscribe({
      next:(result) => {
        this.client = result
      },
      error: error => console.log(error)
    });
  }
}
