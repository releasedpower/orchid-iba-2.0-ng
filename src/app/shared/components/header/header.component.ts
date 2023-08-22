import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TokenService } from 'src/app/features/login/services/token.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private cookieService:CookieService, 
      private router: Router,
      private tokenService: TokenService
    ) { }

  ngOnInit(): void {
    // $.tree('.sidebar');
    $.pushMenu.activate("[data-toggle='offcanvas']");
  }

  logout(): void {
    this.cookieService.delete('token', '/', 'localhost');
    this.cookieService.delete('clt_vcode', '/', 'localhost');
    this.tokenService.unsetExpiration();
    this.router.navigateByUrl('/login');
  }
}
