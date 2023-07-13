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

  productoSeleccionado: Producto | null = null;
  recetaNuevo: Receta = new Receta();
  cantidadProducto: number | null = null;


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

  public agregarProductoAlPedido() {
    if (this.productoSeleccionado && this.cantidadProducto) {
      const productoConCantidad: Producto = { ...this.productoSeleccionado };
      productoConCantidad.cantidad = this.cantidadProducto;
      this.recetaNuevo.obProducto.push(productoConCantidad);
      this.recetaNuevo.producs.push({ produ: this.productoSeleccionado._id, cantidad: this.cantidadProducto });
      // Restablecer los valores
      this.productoSeleccionado = null;
      this.cantidadProducto = null;
    }
  }

  registrar() {
    const nuevaReceta: Receta = {
      _id: this.recetaNuevo._id,
      nombre: this.recetaNuevo.nombre,
      alergenos: this.recetaNuevo.alergenos,
      descripcion: this.recetaNuevo.descripcion,
      obProducto: this.recetaNuevo.obProducto,
      precio: this.recetaNuevo.precio,
      producs: this.recetaNuevo.producs,
      productos: this.recetaNuevo.productos,
      cantidad: this.recetaNuevo.cantidad,
    };

    this.recetaService.createReceta(nuevaReceta).subscribe(
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
}