import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { totalmem } from 'os';
import { Items } from 'src/app/models/items';
import { Pedido } from 'src/app/models/pedido';
import { Producto } from 'src/app/models/producto';
import { Receta } from 'src/app/models/receta';
import { ItemsService } from 'src/app/services/items.service';
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
    public itemsExtraService: ItemsService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getRecetas();
    this.getProductos();
  }

  todasRecetas: Receta[] = [];
  todosItems: Items[] = [];
  recetaSeleccionada: Receta | null = null;
  ItemSeleccionado: Items | null = null;
  pedidoNuevo: Pedido = new Pedido();
  cantidadReceta: number | null = null;
  cantidadItem: number | null = null;
  nota!:string;
  alergenos!:string;
  totalCalculado!:number;
  nombreCliente!:string;
  mesa!:string;

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
    this.itemsExtraService.getItems().subscribe(
      resp => {
        this.todosItems = resp;
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
      this.pedidoNuevo.alergenos = this.alergenos;
      // Restablecer los valores
      this.recetaSeleccionada = null;
      this.cantidadReceta = null;
    }
  }
  
  public agregarItemsPedido() {
    if (this.ItemSeleccionado && this.cantidadItem) {
      const ItemConCantidad: Items = { ...this.ItemSeleccionado };
      ItemConCantidad.cantidad = this.cantidadItem;
      this.pedidoNuevo.obItemsExtra.push(ItemConCantidad);
      this.pedidoNuevo.items.push({ item: this.ItemSeleccionado._id, cantidad: this.cantidadItem });
      // Restablecer los valores
      this.ItemSeleccionado = null;
      this.cantidadItem = null;
    }
  }

  public calcularTotal(): number {
    const totalPedido = this.pedidoNuevo.obReceta.reduce((total, receta) => total + (receta.precio * receta.cantidad), 0);
    const totalItemsExtra = this.pedidoNuevo.obItemsExtra.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    return totalPedido + totalItemsExtra;
  }

  public setPedido() {
    this.totalCalculado = this.calcularTotal();
    console.log(this.totalCalculado);
    const nuevoPedido: Pedido = {
      _id: this.pedidoNuevo._id,
      recetas: this.pedidoNuevo.recetas,
      items: this.pedidoNuevo.items,
      obItemsExtra: this.pedidoNuevo.obItemsExtra,
      obReceta: this.pedidoNuevo.obReceta,
      nota: this.pedidoNuevo.nota,
      alergenos: this.pedidoNuevo.alergenos,
      estado: "pendiente",
      horario: this.pedidoNuevo.horario,
      fecha: this.pedidoNuevo.fecha,
      total: this.totalCalculado,
      nombreCliente: this.nombreCliente,
      mesa: this.mesa
    };
    
    // Enviar el nuevo pedido al backend
    this.pedidoService.crearPedido(nuevoPedido).subscribe(
      respuesta => {
        console.log('pedido paso al backend');
        this.router.navigate(['pedidos']);
      },
      error => {
        console.log('No se pudo crear el pedido');
      }
    );
    this.router.navigate(['pedidos']);
  }

  listar(){
    this.router.navigate(['pedidos']);
  }
}


