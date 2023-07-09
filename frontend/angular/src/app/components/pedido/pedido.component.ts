import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';
import { ProductoService } from 'src/app/services/producto.service';
import { RecetaService } from 'src/app/services/receta.service';
import { forkJoin, Observable } from 'rxjs';
import { Receta } from 'src/app/models/receta';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  constructor(public router:Router,public pedidoService: PedidoService, 
    public recetaService: RecetaService, 
    public productoService: ProductoService) { }

  ngOnInit(): void {
    this.getPedidos();
  }
  arrayPedidos: Pedido[] = [];

  public getPedidos() {
    this.pedidoService.getPedidos().subscribe(
      response => {
        this.arrayPedidos = response;
        console.log(this.arrayPedidos);
        this.agregarRecetasPedido();

      }, error => {
        console.log('no ai pedidos');
      }
    )


  }


  public agregarRecetasPedido() {
    const observables: Observable<any>[] = [];
  
    this.arrayPedidos.forEach(pedido => {
      pedido.obReceta = []; // Inicializar el arreglo de recetas para cada pedido
  
      if (pedido.receta && pedido.receta.length > 0) {
        pedido.receta.forEach(ped => { 
          const id = ped.receta;
          const observable: Observable<any> = this.recetaService.getRecetas();
          observables.push(observable);
        });
      }
    });
  

    forkJoin(observables).subscribe(
      respuestas => {
        let index = 0;
        this.arrayPedidos.forEach(pedido => {
          pedido.obReceta = respuestas.slice(index, index + pedido.receta.length);
          index += pedido.receta.length;
        });
        console.log(respuestas);
        this.agregarItemsPedido();
      },
      error => {
        console.log(error);
        console.log('No hay receta para el pedido');
      }
    );
  }

  public agregarItemsPedido() {
    const observables: Observable<any>[] = [];
  
    this.arrayPedidos.forEach(pedido => {
      pedido.obItemsExtra = []; // Inicializar el arreglo de items extra para cada pedido
  
      if (pedido.items && pedido.items.length > 0) {
        pedido.items.forEach(item => {
          const id = item.item; // Obtener el valor del id desde la propiedad item
          const observable: Observable<any> = this.productoService.getProducto(id);
          observables.push(observable);
        });
      }
    });

    forkJoin(observables).subscribe(
      respuestas => {
        let index = 0;
        this.arrayPedidos.forEach(pedido => {
          pedido.obItemsExtra = respuestas.slice(index, index + pedido.items.length);
          index += pedido.items.length;
        });
        console.log(respuestas);
      },
      error => {
        console.log('No hay items de pedido');
      }
    );
  }

}
