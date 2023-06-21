import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private http: HttpClient) { }
  private api ='mongodb://127.0.0.1/proyectodb'

  getProducto(): Observable<any> {
    return this.http.get<any>(this.api);
  }

  postProducto(productoData: any): Observable<any> {
    return this.http.post<any>(this.api, productoData);
  }

  deleteProducto(id: number): Observable<any> {
    const url = `mongodb://127.0.0.1/proyectodb`;
    return this.http.delete<any>(url);
  }

  putProducto(id: number, productoData: any): Observable<any> {
    const url = `mongodb://127.0.0.1/proyectodb`;
    return this.http.put<any>(url, productoData);
  }


}
