import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pago } from '../models/pago';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  urlBase: string = "http://localhost:3000/api/pago/";

  constructor( private http: HttpClient) { }


  getPagos():Observable<any>{
    let httpOption = {
      headers: new HttpHeaders(
        {

        }
      ),
      params: new HttpParams()
    }
    return this.http.get(this.urlBase, httpOption);
  }

  getPago(id:string):Observable<any>{
    let httpOption = {
      headers: new HttpHeaders(
        {

        }
      ),
      params: new HttpParams()
    }
    return this.http.get(this.urlBase +id, httpOption);
  }

  crearPago(pago:Pago):Observable<any>{
    let httpOption = {
      headers: new HttpHeaders(
        {
          "content-type":"application/json"
        }
      ),
      params: new HttpParams()
    }
    let body = JSON.stringify(pago);
    return this.http.post(this.urlBase +"/post" ,body, httpOption);
  }

  editPago(pago:Pago):Observable<any>{
    const httpOptions = {

      headers: new HttpHeaders({

      }),
      params: new HttpParams(),
    };
    const body = {
      _id: pago._id,
      monto: pago.monto,
      receta: pago.receta,
      items: pago.items,
      metodo: pago.metodo,
      nota: pago.nota,
      horario:pago.horario,
      fecha:pago.fecha,
    };
    return this.http.put(this.urlBase+ ""+ pago._id, body, httpOptions);
  }

  deletePago(id: string): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
    }
    return this.http.delete(this.urlBase + "" + id, httpOption);
  }

  // eliminarPago(id:string):Observable<any>{
  //   let httpOption = {
  //     headers: new HttpHeaders(
  //       {
  //         "content-type":"application/json"
  //       }
  //     ),
  //     params: new HttpParams()
  //   };
    
  //   return this.http.delete(this.urlBase+id);
  // }

}
