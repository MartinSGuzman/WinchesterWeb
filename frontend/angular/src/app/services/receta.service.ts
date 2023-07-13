import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Receta } from '../models/receta';

@Injectable({
  providedIn: 'root'
})
export class RecetaService {
  urlBase: string = 'http://localhost:3000/api/';

  constructor(private _httpCliente: HttpClient) { }

  getRecetas(): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams()//.append("estado",true)
    }
    return this._httpCliente.get(this.urlBase + "receta", httpOption);
  }

  createReceta(receta: Receta): Observable<any> {

    let producs: { produ: string, cantidad: number }[] = [];

    for (let i = 0; i < receta.obProducto.length; i++) {
      let nuevaProducto = {
        produ: receta.obProducto[i]._id,
        cantidad: receta.obProducto[i].cantidad
      };

      producs.push(nuevaProducto);
    }

    console.log(producs);

    let nombre = receta.nombre;
    let precio = receta.precio;
    let productos = receta.productos;
    //let impuestos = receta.impuestos;
    let alergenos = receta.alergenos;
    let descripcion = receta.descripcion;
    let httpOption = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }),
      //params: new HttpParams()
    }
    const body = {
      nombre,
      precio,
      productos,
      alergenos,
     // impuestos,
      descripcion
    };
    return this._httpCliente.post(this.urlBase + "receta/post", body, httpOption);
  }

  getReceta(id: string): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
    }
    return this._httpCliente.get(this.urlBase + "receta/" + id, httpOption);
  }

  editReceta(receta: Receta): Observable<any> {
    const httpOptions = {

      headers: new HttpHeaders({

      }),
      params: new HttpParams(),
    };
    const body = {
      _id: receta._id,
      nombre: receta.nombre,
      precio: receta.precio,
      alergenos: receta.alergenos,
      //impuestos: receta.impuestos,
      descripcion: receta.descripcion,
      productos:receta.productos,
    };
    return this._httpCliente.put(this.urlBase + "receta/" + receta._id, body, httpOptions);
  }

  deleteReceta(id: string): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams()//.append("estado",true)
    }
    return this._httpCliente.delete(this.urlBase + "receta/" + id, httpOption);
  }
}
