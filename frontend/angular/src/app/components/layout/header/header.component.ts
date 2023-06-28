import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth-service.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService) { }

  isLoggedIN!:boolean;
  user!:any;

  ngOnInit(): void {
    this.isLoggedIN=this.authService.isLoggedIn;
  }

  logout(){
    this.authService.logout();
  }

  

}
