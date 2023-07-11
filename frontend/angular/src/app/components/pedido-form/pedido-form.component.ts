import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pedido } from 'src/app/models/pedido';
import { Producto } from 'src/app/models/producto';
import { Receta } from 'src/app/models/receta';
import { PedidoService } from 'src/app/services/pedido.service';
import { ProductoService } from 'src/app/services/producto.service';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.css']
})
export class PedidoFormComponent implements OnInit {

  constructor(
    public recetasService: RecetaService,
    public productoService: ProductoService,
    public pedidoService: PedidoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getRecetas();
    this.getProductos();
  }

  todasRecetas: Receta[] = [];
  todosProductos: Producto[] = [];
  recetaSeleccionada: Receta | null = null;
  productoSeleccionado: Producto | null = null;
  pedidoNuevo: Pedido = new Pedido();
  cantidadReceta: number | null = null;
  cantidadProducto: number | null = null;
  nota!:string;

  public getRecetas() {
    this.recetasService.getRecetas().subscribe(
      respuesta => {
        this.todasRecetas = respuesta;
      },
      error => {
        console.log('No hay recetas');
      }
    );
  }

  public getProductos() {
    this.productoService.getProductos().subscribe(
      resp => {
        this.todosProductos = resp;
      },
      error => {
        console.log('No hay productos');
      }
    );
  }

  public agregarRecetaAlPedido() {
    if (this.recetaSeleccionada && this.cantidadReceta) {
      const recetaConCantidad: Receta = { ...this.recetaSeleccionada };
      recetaConCantidad.cantidad = this.cantidadReceta;
      this.pedidoNuevo.obReceta.push(recetaConCantidad);
      this.pedidoNuevo.recetas.push({ receta: this.recetaSeleccionada._id, cantidad: this.cantidadReceta });
      this.pedidoNuevo.nota = this.nota;
      // Restablecer los valores
      this.recetaSeleccionada = null;
      this.cantidadReceta = null;
    }
  }
  
  public agregarProductoAlPedido() {
    if (this.productoSeleccionado && this.cantidadProducto) {
      const productoConCantidad: Producto = { ...this.productoSeleccionado };
      productoConCantidad.cantidad = this.cantidadProducto;
      this.pedidoNuevo.obItemsExtra.push(productoConCantidad);
      this.pedidoNuevo.items.push({ item: this.productoSeleccionado._id, cantidad: this.cantidadProducto });
      // Restablecer los valores
      this.productoSeleccionado = null;
      this.cantidadProducto = null;
    }
  }

  public setPedido() {
    const nuevoPedido: Pedido = {
      _id: this.pedidoNuevo._id,
      recetas: this.pedidoNuevo.recetas,
      items: this.pedidoNuevo.items,
      obItemsExtra: this.pedidoNuevo.obItemsExtra,
      obReceta: this.pedidoNuevo.obReceta,
      nota: this.pedidoNuevo.nota,
      estado: "pendiente",
      horario: this.pedidoNuevo.horario,
      fecha: this.pedidoNuevo.fecha
    };
    
    // Enviar el nuevo pedido al backend
    this.pedidoService.crearPedido(nuevoPedido).subscribe(
      respuesta => {
        console.log('pedido paso al backend');
      },
      error => {
        console.log('No se pudo crear el pedido');
      }
    );
  }

  listar(){
    this.router.navigate(['pedidos']);
  }
}


