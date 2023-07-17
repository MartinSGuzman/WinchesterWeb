import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  urlBase: string = "http://localhost:3000/api/";

  constructor(private http: HttpClient) { }


  getPedidos(): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders(
        {

        }
      ),
      params: new HttpParams()
    }
    return this.http.get(this.urlBase + "pedido/" ,httpOption);
  }

  getPedido(id:string): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders(
        {

        }
      ),
      params: new HttpParams()
    }
    return this.http.get(this.urlBase + "pedido/"+id ,httpOption);
  }
  

  public getReceta(id: string): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
    }
    return this.http.get(this.urlBase + "pedido/" + id, httpOption);
  }


  public crearPedido(pedido: Pedido): Observable<any> {
    let fechaActual = new Date();

    let recetas: { receta: string, cantidad: number }[] = [];

    for (let i = 0; i < pedido.obReceta.length; i++) {
      let nuevaReceta = {
        receta: pedido.obReceta[i]._id,
        cantidad: pedido.obReceta[i].cantidad
      };

      recetas.push(nuevaReceta);
    }

    let nota: string = pedido.nota;
    let alergenos: string = pedido.alergenos;
    let total: number = pedido.total;

    let items: { item: string, cantidad: number }[] = [];
    for (let i = 0; i < pedido.obItemsExtra.length; i++) {
      let nuevoItem = {
        item: pedido.obItemsExtra[i]._id,
        cantidad: pedido.obItemsExtra[i].cantidad
      };

      items.push(nuevoItem);
    }
    let estado = "Pendiente";
    let fecha = fechaActual.toISOString();
    let horario = fechaActual.toLocaleString('es-ES', { hour: '2-digit', minute: '2-digit' });
    let nombreCliente = pedido.nombreCliente;
    let mesa = pedido.mesa;

    console.log(recetas);
    console.log(items);
    console.log(nota);
    console.log(alergenos);
    console.log(estado);
    console.log(horario);
    console.log(fecha);

    let httpOptions = {
      headers: new HttpHeaders({
        "content-type": "application/json"
      }),
      params: new HttpParams()
    };

    const body = {
      recetas,
      items,
      nota,
      alergenos,
      estado,
      horario,
      fecha,
      total,
      nombreCliente,
      mesa
    };

    return this.http.post(this.urlBase + 'pedido/post', body, httpOptions);
  }

  deletePedido(id: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.delete<any>(this.urlBase +"pedido/" +id, httpOptions);
  }

  putPedido(id: string, idReceta: string, idItems: string, nota: string,alergenos:string, estado: string, horario: string, fecha: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = {
      idReceta,
      idItems,
      nota,
      alergenos,
      estado,
      horario,
      fecha
    };
    return this.http.put<any>(this.urlBase + "pedido/"+id, body, httpOptions);
  }


}
