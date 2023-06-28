import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/pedido';
import { PedidoService } from 'src/app/services/pedido.service';
import { ProductoService } from 'src/app/services/producto.service';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {

  constructor(public pedidoService: PedidoService, public recetaService: RecetaService, public productoService: ProductoService) { }

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
    this.arrayPedidos.forEach(pedido => {
      for(let i = 0;i<pedido.receta.length;i++){
      let id =pedido.receta[i];
      
      this.recetaService.getReceta(id).subscribe(
        resp => {
          pedido.obReceta = resp;
          console.log(pedido.obReceta);
          this.agregarItemsPedido();
        },
        error => {
          console.log('No hay receta para el pedido');
        }
      );
      }
    });
  
    
  }

  public agregarItemsPedido() {
    this.arrayPedidos.forEach(pedido => {
      let id = pedido.items[0];
      this.productoService.getProducto(id).subscribe(
        resp => {
          console.log(resp);
          pedido.obItemsExtra = resp;
        },
        error => {
          console.log('No hay items de pedido');
        }
      );
    });
  }


}
