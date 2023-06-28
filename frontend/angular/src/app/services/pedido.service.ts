import { HttpClient,HttpParams,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  urlBase: string = "http://localhost:3000/api/pedido";

  constructor( private http: HttpClient) { }


  getPedidos():Observable<any>{
    let httpOption = {
      headers: new HttpHeaders(
        {

        }
      ),
      params: new HttpParams()
    }
    return this.http.get(this.urlBase, httpOption);
  }

  getPedido(id:string):Observable<any>{
    let httpOption = {
      headers: new HttpHeaders(
        {

        }
      ),
      params: new HttpParams()
    }
    return this.http.get(this.urlBase+id, httpOption);
  }

  crearPedido(receta:string, items:string, nota:string, estado:string, horario:string, fecha:string):Observable<any>{
    let httpOption = {
      headers: new HttpHeaders(
        {
          "content-type":"application/json"
        }
      ),
      params: new HttpParams()
    }
    const body = {
      receta,
      items,
      nota,
      estado,
      horario,
      fecha
    };
    return this.http.post(this.urlBase,body, httpOption);
  }

  deletePedido(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete<any>(this.urlBase+id,httpOptions);
  }

  putPedido(id:string,idReceta:string, idItems:string, nota:string, estado:string, horario:string, fecha:string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = {
      idReceta,
      idItems,
      nota,
      estado,
      horario,
      fecha
    };
    return this.http.put<any>(this.urlBase+id,body,httpOptions);
  }


}
