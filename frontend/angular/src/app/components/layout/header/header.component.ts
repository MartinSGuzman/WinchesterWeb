import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth-service.service';
import { Usuario } from 'src/app/models/usuario';
import { UsuarioService } from 'src/app/services/usuario.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  usuarioLoggeado!: any;
  esAdmin: boolean = false;
  esMozo: boolean = false;
  esCocinero: boolean = false;

  constructor(public loginService: UsuarioService) { }

  ngOnInit() {
    this.loginService.userLoggedIn$.subscribe((loggedIn) => {
      if (loggedIn) {
        this.usuarioLoggeado = this.loginService.userLogged();
        console.log("Usuario conectado:", this.usuarioLoggeado);
        this.esCocinero = this.loginService.isCocinero();
        this.esMozo = this.loginService.isMozo();
        this.esAdmin = this.loginService.isAdmin();
      } else {
        this.usuarioLoggeado = '';
        this.esCocinero = false;
        this.esMozo = false;
        this.esAdmin = false;
      }
    });
  }

  logout() {
    this.loginService.logout();
  }

  userLoggedIn() {
    return this.loginService.userLoggedIn();
  }
}




