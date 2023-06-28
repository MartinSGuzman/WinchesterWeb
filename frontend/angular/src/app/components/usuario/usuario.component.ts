import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth-service.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  arrayUsuarios: any[] = [];
  encontrado: boolean = false;
  userIn!: string;
  passIn!: string;
  returnUrl!: string;
  msglogin!:string;


  constructor(public usuarioService: UsuarioService, private router: Router, private route: ActivatedRoute,public authService: AuthService) { }

  ngOnInit(): void {
    this.returnUrl= this.route.snapshot.queryParams['returnUrl']||'/pago';
    this.authService.isLoggedIn=false;
  }

  login(user:string,pass:string) {
    this.usuarioService.loginUsuario(user, pass)
      .subscribe(
        (result) => {
          var user = result;
          if (user.status == 1) {
            //guardamos el token localmente
            sessionStorage.setItem("token", user.token);
            //guardamos el user
            sessionStorage.setItem("user", user.username);
            sessionStorage.setItem("userid", user.userid);
            sessionStorage.setItem("rol", user.rol);
            //redirigimos a home o a pagina que llamo
            this.router.navigateByUrl(this.returnUrl);
            this.authService.isLoggedIn = true;
          } else {
            //usuario no encontrado muestro mensaje en la vista
            this.msglogin = "Credenciales incorrectas..";
          }
        },
        error => {
          alert("Error de conexion");
          console.log("error en conexion");
          console.log(error);
        });
  }
}
