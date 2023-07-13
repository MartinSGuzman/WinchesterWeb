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
  constructor(
    public router: Router,
    public pedidoService: PedidoService,
    public recetaService: RecetaService,
    public productoService: ProductoService
  ) {}

  ngOnInit(): void {
    this.getPedidos();
  }

  arrayPedidos: Pedido[] = [];

  public getPedidos() {
    this.pedidoService.getPedidos().subscribe(
      (response: Pedido[]) => {
        this.arrayPedidos = response;
        console.log(this.arrayPedidos);
        this.agregarRecetasPedido();
      },
      error => {
        console.log(error);
        console.log('No hay pedidos');
      }
    );
  }

  public agregarRecetasPedido() {
    const observables: Observable<any>[] = [];

    this.arrayPedidos.forEach(pedido => {
      console.log('Pedido:', pedido);
    
      pedido.obReceta = []; // Inicializar el arreglo de recetas para cada pedido
    
      if (pedido.recetas && pedido.recetas.length > 0) {
        pedido.recetas.forEach(ped => {
          console.log('Ped:', ped);
    
          if (ped && ped.receta) { // Verificar si el objeto y la propiedad existen
            const id = ped.receta;
            console.log('ID:', id);
    
            const observable: Observable<any> = this.recetaService.getReceta(id);
            observables.push(observable);
          } else {
            console.log('Propiedad "receta" faltante o incorrecta en el objeto pedido');
          }
        });
      } else {
        console.log('Arreglo "receta" faltante o vacío en el objeto pedido');
      }
    });

    forkJoin(observables).subscribe(
      respuestas => {
        let index = 0;
        this.arrayPedidos.forEach(pedido => {
          pedido.obReceta = respuestas.slice(index, index + pedido.recetas.length);
          index += pedido.recetas.length;
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
        console.log(error);
        console.log('No hay items de pedido');
      }
    );
  }

  eliminarPedido(id:string){
    this.pedidoService.deletePedido(id).subscribe
    (
      resp=>{
        console.log(resp);
      },error=>{
        console.log(error);
      }
    )
    this.getPedidos();
  }

  public cambiarEstado(pedido: any, estado: string) {
    pedido.estado = estado;
  }

  getEstadoColor(estado: string): string {
    if (estado === 'Terminado') {
      return 'green'; // Color verde para el estado "Terminado"
    } else if (estado === 'En Progreso') {
      return 'blue'; // Color azul para el estado "En Progreso"
    } else if (estado === 'Eliminar') {
      return 'red'; // Color rojo para el estado "Eliminar"
    } else {
      return ''; // Color transparente si el estado no coincide con ninguno de los anteriores
    }
  }
}
