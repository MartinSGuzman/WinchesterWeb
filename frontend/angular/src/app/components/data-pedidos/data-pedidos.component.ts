import { Component, OnInit } from '@angular/core';
import { Observable, Subject, forkJoin } from 'rxjs';
import { Pedido } from 'src/app/models/pedido';
import { ItemsService } from 'src/app/services/items.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-data-pedidos',
  templateUrl: './data-pedidos.component.html',
  styleUrls: ['./data-pedidos.component.css']
})
export class DataPedidosComponent implements OnInit {

  constructor( private pedidosService : PedidoService,
               private recetaService: RecetaService,
               private ItemsService: ItemsService) { }

  dtOptions : DataTables.Settings = {};
  dtTrigger : Subject<any> = new Subject<any>();

  datos : any = [];

  ngOnInit():void{
    this.dtOptions = {
      pagingType : 'full_pages',
      pageLength : 5,
    }, this.getPedidos();
    this.dtTrigger.next(this.arrayPedidos);
  }
  //this.dtTrigger.next(this.datos);
  
  
  ngOnDestroy():void{
    this.dtTrigger.unsubscribe();

  }

  arrayPedidos: Pedido[] = [];
  
  public getPedidos() {
    this.pedidosService.getPedidos().subscribe(
      (response: Pedido[]) => {
        this.arrayPedidos = response;
        console.log(response[0].total);
        this.dtTrigger.next(response);
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
          console.log('item:', item);
          const id = item.item; 
          console.log(id);// Obtener el valor del id desde la propiedad item
          const observable: Observable<any> = this.ItemsService.getItem(id);
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


  

}
