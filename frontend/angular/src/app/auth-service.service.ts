import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn: boolean;
  user!:any;

  constructor() {
    if (sessionStorage.getItem('userid') === null || sessionStorage.getItem('userid') === '') {
      this.isLoggedIn = false;
    } else {
      this.isLoggedIn = true;
      this.user = sessionStorage.getItem("user");
    }
  }

  logout() {
    // Elimina los datos de sesión
    sessionStorage.removeItem('userid');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('rol');
    // Reinicia el estado de isLoggedIn
    this.isLoggedIn = false;
  }
}