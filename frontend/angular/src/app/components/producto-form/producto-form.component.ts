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
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.producto = new Producto()
    this.productos = new Array<Producto>();
    //this.calcular();
  }

  ngOnInit(): void {
    // this.activatedRoute.params.subscribe(params => {
    //   if (params['id'] == "0") {
    //     this.accion = "new";
    //     this.cargarProductoss();
    //   } else {
    //     this.accion = "update";
    //     this.cargarProductoss();
    //     this.cargarReceta(params['id']);
    //   }
    // });
  }

  cargarProducto(id: string) {
    this.productoService.getProducto(id).subscribe(
      result => {
        Object.assign(this.producto, result);
        
       
        console.log(result);
      },
      error => {
        console.log(error);
      }
    )
  }

  // cargarProductoss() {
  //   this.productoService.getProductos().subscribe(
  //     result => {
  //       let unProducto = new Producto();
  //       result.forEach((element: any) => {
  //         Object.assign(unProducto, element)
  //         this.productosss.push(unProducto)
  //         unProducto = new Producto();
  //       });
  //       console.log(result);
  //     },
  //     error => {

  //     }
  //   )
  // }

  registrar() {
    this.productoService.createReceta(this.producto).subscribe(
      (result: any) => {
        if (result.status == 1) {
          console.log(result.msg);
          this.router.navigate(['producto']);
        }
      },
      error => {
        alert(error.msg);
      }
    )
  }

  actualizarProducto() {
    this.productoService.editProducto(this.producto).subscribe(
      (result: any) => {
        if (result.status == 1) {
          console.log(result.msg);
          this.router.navigate(['producto']);
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
  //   this.receta.costoTotal = this.receta.impuestos * this.receta.precio
  // }
}