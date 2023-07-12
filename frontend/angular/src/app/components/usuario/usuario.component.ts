import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  userform: Usuario = new Usuario(); //usuario mapeado al formulario
  returnUrl!: string;
  msglogin!: string; // mensaje que indica si no paso el loguin
  user!: string;
  pass!: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loginService: UsuarioService) {
  }
  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'pago';
  }

  public login() {
    this.user = this.userform.username;
    this.pass = this.userform.password;
    this.loginService.login(this.user, this.pass)
      .subscribe(
        (result) => {
          var user = result;
          if (user.status == 1) {
            //guardamos el user en cookies en el cliente
            sessionStorage.setItem("user", user.username);
            sessionStorage.setItem("userid", user.userid);
            sessionStorage.setItem("rol", user.rol);
            this.msglogin = "Login valido";
            console.log(sessionStorage.getItem('user'));
            console.log(sessionStorage.getItem('perfil'));
            console.log(sessionStorage.getItem('userid'));

            //redirigimos a home o a pagina que llamo
            if(sessionStorage.getItem('user')=="admin"){
                this.returnUrl = 'pago';
            }else if(sessionStorage.getItem('user')=="mozo")
            {
              this.returnUrl = 'pedidos';
            }else if(sessionStorage.getItem('user')=="cocinero")
            {
              this.returnUrl = 'producto'
            }
            this.router.navigateByUrl(this.returnUrl);

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
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([this.router.url]);
        });
  }
}