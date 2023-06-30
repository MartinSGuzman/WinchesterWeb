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
  productos!: Array<Producto>;
  total: number = 0;

  constructor(private productoService: ProductoService,
    private router: Router) {

    this.producto = new Producto();
    this.productos = new Array<Producto>();
    //this.cargarRecetas();
    //this.totalCostoReceta();
  }

  ngOnInit(): void {
  }

  cargarProductos() {
    this.productoService.getProductos().subscribe(
      result => {
        result.forEach((element: any) => {
          let unReceta: Producto = new Producto();
          Object.assign(unReceta, element)
          this.productos.push(unReceta)
          unReceta = new Producto();
        });
        console.log(result);
      },
      error => {
        console.log(error);
      }
    )
  }

  totalCostoProducto() {
    this.total = 0;
    this.total = this.total + this.producto.costoTotal;
  }

  modificarProducto(receta: Producto) {
    this.router.navigate(["producto-form", this.producto._id]);
  }

  eliminarProducto(receta: Producto) {
    this.productoService.deleteProducto(this.producto._id).subscribe(
      result => {
        if (result.status == "1") {
          //pasar a toast
          console.log(result.msg);
          this.router.navigate(['producto']);
          this.cargarProductos();
          window.location.reload();
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


