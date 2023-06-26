import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pago } from '../models/pago';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  urlBase: string = "http://localhost:3000/api/pago";

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
    return this.http.get(this.urlBase+id, httpOption);
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
    return this.http.post(this.urlBase,body, httpOption);
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
