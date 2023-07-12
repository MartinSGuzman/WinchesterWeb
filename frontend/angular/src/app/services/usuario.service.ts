import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  urlBase: string = "http://localhost:3000/api/usuario/";
  private userLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public userLoggedIn$: Observable<boolean> = this.userLoggedInSubject.asObservable();
  
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
    return this.http.post<any>(this.urlBase + 'post', body, HttpOptions);
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
      headers: new HttpHeaders({})
    };

    const body = {
      username,
      password
    };

    return this.http.post(this.urlBase + 'login', body, httpOption)
      .pipe(
        tap((response: any) => {
          console.log("Inicio de sesión exitoso:", response);
          sessionStorage.setItem('user', response.username);
          sessionStorage.setItem('perfil', response.rol);
          sessionStorage.setItem('userid', response.id);
          this.userLoggedInSubject.next(true);
        })
      );
  }

  public logout() {
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('perfil');
    sessionStorage.removeItem('userid');
    this.userLoggedInSubject.next(false);
  }

  public userLoggedIn(): boolean {
    const usuario = sessionStorage.getItem('user');
    return usuario !== null && usuario !== '';
  }
  public userLogged() {
    var usuario = sessionStorage.getItem("user");
    return usuario;
  }
  public idLogged() {
    var id = sessionStorage.getItem("userid");
    return id;
  }

  public isCocinero(): boolean {
    return sessionStorage.getItem('user') === 'cocinero';
  }

  public isMozo(): boolean {
    return sessionStorage.getItem('user') === 'mozo';
  }

  public isAdmin(): boolean {
    return sessionStorage.getItem('user') === 'admin';
  }


}
