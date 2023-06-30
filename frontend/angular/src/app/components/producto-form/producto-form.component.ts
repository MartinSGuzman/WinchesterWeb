import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.css']
})
export class ProductoFormComponent implements OnInit {

  producto!: Producto;
  accion: string = "new" // accion tendra los valores de new o update
  productos!: Array<Producto>;

  constructor(private productoService: ProductoService,
    private router: Router){}

  ngOnInit(): void {

  }


  cargarProductoss() {
    this.productoService.getProductos().subscribe(
      result => {
        let unProducto = new Producto();
        result.forEach((element: any) => {
          Object.assign(unProducto, element)
          this.productos.push(unProducto)
          unProducto = new Producto();
        });
        console.log(result);
      },
      error => {
        console.log(error);
      }
    )
  }




  registrar() {
    this.productoService.createProducto(this.producto).subscribe(
      (result: any) => {
        if (result.status == 1) {
          console.log(result.msg);
          this.router.navigate(["producto"]);
        }
      },
      error => {
        alert(error.msg);
      }
    )
  }

  actualizarProducto() {
    this.productoService.editReceta(this.producto).subscribe(
      (result: any) => {
        if (result.status == 1) {
          console.log(result.msg);
          this.router.navigate(["producto"]);
        }
      },
      error => {
        alert(error.msg);
      }
    )
  }

  volverLista() {
    this.router.navigate(['producto'])
  }

  // calcular() {
  //   this.producto.costoTotal = this.producto.impuestos * this.producto.precio
  // }

}
