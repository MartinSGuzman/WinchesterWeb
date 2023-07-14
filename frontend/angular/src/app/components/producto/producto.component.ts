import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  producto!: Producto;
  Productos!: Array<Producto>;

  constructor(private productoService: ProductoService,
    private router: Router) {
    this.producto = new Producto();
    this.Productos = new Array<Producto>();
    this.cargarProductos();

  }

  ngOnInit(): void {
  }

  cargarProductos() {
    this.productoService.getProductos().subscribe(
      result => {
        result.forEach((element: any) => {
          let unProducto: Producto = new Producto();
          Object.assign(unProducto, element)
          this.Productos.push(unProducto)
          unProducto = new Producto();
        });
        console.log(result);
      },
      error => {
        console.log(error);
      }
    )
  }

  modificarProducto(producto: Producto) {
    this.router.navigate(['producto-form', producto._id]);
  }

  eliminarProducto(producto: Producto) {
    this.productoService.deleteProducto(producto._id).subscribe(
      result => {
        if (result.status == "1") {
          console.log(result.msg);

          this.cargarProductos();

        }
      },
      error => {
        if (error.status == "0") {
          alert(error.msg);
        }
      }

    )
  }

  agregarProducto() {
    this.router.navigate(['producto-form/', 0])
  }


}