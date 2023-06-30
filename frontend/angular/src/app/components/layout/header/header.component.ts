import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService, public loginService: UsuarioService) { }

  ngOnInit() {
  }
  logout() {
    this.loginService.logout();
  }

  
}




