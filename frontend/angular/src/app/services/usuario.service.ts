import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  urlBase: string = "http://localhost:3000/api/usuario/";
  constructor(private http: HttpClient) { }

  public getUsuarios(): Observable<any> {
    let HttpOptions = {
      headers: new HttpHeaders({}),
      params: new HttpParams()
    }
    return this.http.get<any>(this.urlBase, HttpOptions);
  }

  public postUsuario(username: string, password: string, nombreApellido: string, rol: string, dni: string): Observable<any> {
    let HttpOptions = {
      headers: new HttpHeaders({}),
      params: new HttpParams()
    }
    const body = {
      username,
      password,
      nombreApellido,
      rol,
      dni
    };
    return this.http.post<any>(this.urlBase + '/post', body, HttpOptions);
  }

  public getUsuario(id: string): Observable<any> {
    let HttpOptions = {
      headers: new HttpHeaders({}),
      params: new HttpParams()
    }
    return this.http.get<any>(this.urlBase + id, HttpOptions);
  }

  public putUsuario(id: string, username: string, password: string, nombreApellido: string, rol: string, dni: string): Observable<any> {
    let HttpOptions = {
      headers: new HttpHeaders({}),
      params: new HttpParams()
    }
    const body = {
      username,
      password,
      nombreApellido,
      rol,
      dni
    };
    return this.http.put<any>(this.urlBase + id, body, HttpOptions);
  }

  public deleteUsuario(id: string): Observable<any> {
    let HttpOptions = {
      headers: new HttpHeaders({}),
      params: new HttpParams()
    }
    return this.http.delete<any>(this.urlBase + id, HttpOptions);
  }

  public getToken(): string {
    if (sessionStorage.getItem("token") != null) {
      return sessionStorage.getItem("token")!;
    } else {
      return "";
    }
  }

  public login(username: string, password: string): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    let body = JSON.stringify({ username: username, password: password });
    console.log(body);
    return this.http.post(this.urlBase + 'login', body, httpOption);
  }
  public logout() {
    //borro el vble almacenado mediante el storage
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("perfil");
    sessionStorage.removeItem("userid");
  }
  public userLoggedIn() {
    var resultado = false;
    var usuario = sessionStorage.getItem("user");
    if (usuario != null) {
      resultado = true;
    }
    return resultado;
  }
  public userLogged() {
    var usuario = sessionStorage.getItem("user");
    return usuario;
  }
  public idLogged() {
    var id = sessionStorage.getItem("userid");
    return id;
  }



}
