import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pago } from '../models/pago';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  urlBase: string = "http://18.205.57.146:3000/api/pago/";

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
    let total = pago.total;
    let metodo = pago.metodo;
    let nota = pago.nota;
    let horario = pago.horario;
    let fecha = pago.fecha;
    let pedido = pago.pedido;
    let nombreCliente = pago.nombreCliente;
    let mesa = pago.mesa;
    console.log(total);
    console.log(metodo);
    console.log(nota); 
    console.log(horario);
    console.log(fecha);
    console.log(pedido);

    const body = {
      
      total,
      metodo, 
      nota ,
      horario, 
      fecha ,
      pedido,
      nombreCliente,
      mesa,
    };
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
      total: pago.total,
      metodo: pago.metodo,
      nota: pago.nota,
      horario:pago.horario,
      fecha:pago.fecha,
      pedido:pago.pedido,
      nombreCliente:pago.nombreCliente,
      mesa:pago.mesa
    };
    return this.http.put(this.urlBase+ ""+ pago._id, body, httpOptions);
  }

  deletePago(id: string): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
    }
    return this.http.delete(this.urlBase + "/" + id, httpOption);
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

  getPagoXmetodo(metodo: string): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams()//.append("estado",true)
    }
    return this.http.get(this.urlBase + "filtro/" + metodo, httpOption);
  }
}
