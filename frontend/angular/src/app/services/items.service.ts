import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Items } from '../models/items';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {
  urlBase: string = 'http://localhost:3000/api/';

  constructor(private _httpCliente: HttpClient) { }

  getItems(): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams()//.append("estado",true)
    }
    return this._httpCliente.get(this.urlBase + "itemsExtra", httpOption);
  }

  createItem(items: Items): Observable<any> {
    let nombre = items.nombre;
    let precio = items.precio;
    let categoria = items.categoria;
    let descripcion = items.descripcion;
    let proveedor = items.proveedor;
    let stock = items.stock;

    let httpOption = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }),
      //params: new HttpParams()
    }
    const body = {
      nombre,
      precio,
      categoria,
      descripcion,
      proveedor,
      stock
    };
    return this._httpCliente.post(this.urlBase + "itemsExtra/post", body, httpOption);
  }

  getItem(id: string): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
    }
    return this._httpCliente.get(this.urlBase + "itemsExtra/" + id, httpOption);
  }

  editItem(items: Items): Observable<any> {
    const httpOptions = {

      headers: new HttpHeaders({

      }),
      params: new HttpParams(),
    };
    const body = {
      _id: items._id,
      nombre: items.nombre,
      categoria: items.categoria,
      descripcion: items.descripcion,
      proveedor: items.proveedor,
      precio: items.precio,
      stock: items.stock,
    };
    return this._httpCliente.put(this.urlBase + "itemsExtra/" + items._id, body, httpOptions);
  }

  deleteItems(id: string): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams()//.append("estado",true)
    }
    return this._httpCliente.delete(this.urlBase + "itemsExtra/" + id, httpOption);
  }
}
