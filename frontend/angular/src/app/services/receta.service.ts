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
    return this._httpCliente.get(this.urlBase + "receta/", httpOption);
  }

  createReceta(receta: Receta): Observable<any> {

    let producs: { produ: string, cantidad: number }[] = [];
    for (let i = 0; i < receta.obProducto.length; i++) {
      let nuevoProducto = {
        produ: receta.obProducto[i]._id,
        cantidad: receta.obProducto[i].cantidad
      };

      producs.push(nuevoProducto);
    }

    let nombre: string = receta.nombre;
    let precio: number = receta.precio;
    let descripcion: string = receta.descripcion;

    console.log(producs);
    console.log(nombre);
    console.log(precio);
    console.log(descripcion);

    let httpOption = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }),
      //params: new HttpParams()
    }
    const body = {
      producs,
      nombre,
      precio,
      //productos,
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
      //impuestos: receta.impuestos,
      descripcion: receta.descripcion,
      producs: receta.producs,
      //productos: receta.productos,
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
