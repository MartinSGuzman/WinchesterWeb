import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  urlBase: string = 'http://localhost:3000/api/';

  constructor(private _httpCliente: HttpClient) { }

  getProductos(): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
    }
    return this._httpCliente.get(this.urlBase + "producto", httpOption);
  }

  createReceta(producto: Producto): Observable<any> {
    let nombre = producto.nombre;
    let categoria = producto.categoria;
    let tipo = producto.tipo;
    let costo = producto.costo;
    let proveedor= producto.proveedor;
    let stock = producto.stock;

    
    let httpOption = {
      headers: new HttpHeaders({
        "Content-type": "application/json"
      }),
      
    }
    const body = {
      nombre,
      categoria,
      tipo,
      costo,
      proveedor,
      stock
    };
    return this._httpCliente.post(this.urlBase + "producto/post", body, httpOption);
  }

  getProducto(id: string): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
    }
    return this._httpCliente.get(this.urlBase + "producto/" + id, httpOption);
  }

  editProducto(producto: Producto): Observable<any> {
    const httpOptions = {

      headers: new HttpHeaders({

      }),
      params: new HttpParams(),
    };
    const body = {
      _id: producto._id,
      nombre: producto.nombre,
      categoria: producto.categoria,
      tipo: producto.tipo,
      costo: producto.costo,
      proveedor: producto.proveedor,
      stock: producto.stock
      
    };
    return this._httpCliente.put(this.urlBase + "producto/" + producto._id, body, httpOptions);
  }

  deleteProducto(id: string): Observable<any> {
    let httpOption = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
    }
    return this._httpCliente.delete(this.urlBase + "producto/" + id, httpOption);
  }
}
