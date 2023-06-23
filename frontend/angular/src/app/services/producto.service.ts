import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  urlBase: string = "http://localhost:3000/api/producto/";
  constructor(private http: HttpClient) { }
  private api = 'mongodb://127.0.0.1/proyectodb'

  getProducto(): Observable<any> {
    let HttpOption = {
      headers: new HttpHeaders({

      }),
      params: new HttpParams()
    }
    return this.http.get<any>(this.urlBase, HttpOption);
  }

  postProducto(costo: number, tipo: string, categoria: string, nombre: string, proveedor: string, stock: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = {
      costo,
      tipo,
      categoria,
      nombre,
      proveedor,
      stock
    };
    return this.http.post<any>(this.urlBase + "post", body, httpOptions);
  }

  deleteProducto(id: number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const url = `mongodb://127.0.0.1/proyectodb`;
    return this.http.delete<any>(this.urlBase+"id",httpOptions);
  }

  putProducto(id: number, costo: number, tipo: string, categoria: string, nombre: string, proveedor: string, stock: number): Observable<any> {
    const url = `mongodb://127.0.0.1/proyectodb`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    const body = {
      costo,
      tipo,
      categoria,
      nombre,
      proveedor,
      stock
    };
    return this.http.put<any>(this.urlBase+"id",body,httpOptions);
  }


}
