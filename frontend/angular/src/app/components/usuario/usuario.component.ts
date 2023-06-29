import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth-service.service';
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
 constructor(
 private route: ActivatedRoute,
 private router: Router,
 private loginService:UsuarioService){
 }
 ngOnInit() {
 this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/pedidos';
 }
 login() {
 this.loginService.login(this.userform.username, this.userform.password)
 .subscribe(
 (result) => {
 var user = result;
 if (user.status == 1){
 //guardamos el user en cookies en el cliente
 sessionStorage.setItem("user", user.username);
 sessionStorage.setItem("userid", user.userid);
 sessionStorage.setItem("perfil", user.perfil);
 //redirigimos a home o a pagina que llamo
 this.router.navigateByUrl(this.returnUrl);
 } else {
 //usuario no encontrado muestro mensaje en la vista
 this.msglogin="Credenciales incorrectas..";
 }
 },
 error => {
 alert("Error de conexion");
 console.log("error en conexion");
 console.log(error);
 });
 }
}