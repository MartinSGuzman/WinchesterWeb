import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { Receta } from 'src/app/models/receta';
import { ProductoService } from 'src/app/services/producto.service';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-receta-form',
  templateUrl: './receta-form.component.html',
  styleUrls: ['./receta-form.component.css']
})
export class RecetaFormComponent implements OnInit {

  receta!: Receta;
  accion: string = "new" // accion tendra los valores de new o update
  productosss!: Array<Producto>;

  constructor(private recetaService: RecetaService,
    private productoService: ProductoService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.receta = new Receta()
    this.productosss = new Array<Producto>();
    this.calcular();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == "0") {
        this.accion = "new";
        this.cargarProductoss();
      } else {
        this.accion = "update";
        this.cargarProductoss();
        this.cargarReceta(params['id']);
      }
    });
  }

  cargarReceta(id: string) {
    this.recetaService.getReceta(id).subscribe(
      result => {
        Object.assign(this.receta, result);
        //añadir los valores en una lista despleglable
        this.receta.productos = this.productosss.find(item => (item._id == this.receta.productos._id))!;
        console.log(result);
      },
      error => {
        console.log(error);
      }
    )
  }

  cargarProductoss() {
    this.productoService.getProductos().subscribe(
      result => {
        let unProducto = new Producto();
        result.forEach((element: any) => {
          Object.assign(unProducto, element)
          this.productosss.push(unProducto)
          unProducto = new Producto();
        });
        console.log(result);
      },
      error => {

      }
    )
  }

  registrar() {
    this.recetaService.createReceta(this.receta).subscribe(
      (result: any) => {
        if (result.status == 1) {
          console.log(result.msg);
          this.router.navigate(['receta']);
        }
      },
      error => {
        alert(error.msg);
      }
    )
  }

  actualizarReceta() {
    this.recetaService.editReceta(this.receta).subscribe(
      (result: any) => {
        if (result.status == 1) {
          console.log(result.msg);
          this.router.navigate(['receta']);
        }
      },
      error => {
        alert(error.msg);
      }
    )
  }

  volverLista() {
    this.router.navigate(['receta'])
  }

  calcular() {
    this.receta.costoTotal = this.receta.impuestos * this.receta.precio
  }
}