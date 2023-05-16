import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/core/auth/token.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild(SidebarComponent)
  sidebar: SidebarComponent = new SidebarComponent;

  userInfos: any;
  constructor(private tokenService: TokenService, private router: Router, private userService: UserService) {
    this.userInfos = [];
  }

  ngOnInit(): void {
    this.getUserInfo(localStorage.getItem('userId') || '');
  }
  // toggleSidebar() {
  //   this.sidebar.toggle();
  // }
  onLogoutClick() {
    this.tokenService.unsetLocalStorage();
    this.router.navigateByUrl('/login');
  }
  getUserInfo(userId:String) {
    this.userService.getUserInfo(userId)
      .subscribe((result: any) => {
        this.userInfos = result;
      });
  }
}
