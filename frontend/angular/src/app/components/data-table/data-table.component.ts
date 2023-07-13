import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  constructor( private productoService : ProductoService) { }

  dtOptions : DataTables.Settings = {};
  dtTrigger : Subject<any> = new Subject<any>();

  datos : any = [];

  ngOnInit():void{
    this.dtOptions = {
      pagingType : 'full_pages',
      pageLength : 5,
    },this.productoService.getProductos().subscribe(
      result =>{
        this.datos = Object.values(result);
        console.log(this.datos);
        this.dtTrigger.next(this.datos);
      }
    )
  }

    // this.getYoutube.getYoutube(this.in.buscar).subscribe(
    //   result =>{
    //     this.ar = result['results'];
    //     //el objet.value sirve para pasarle un objeto y este nos devuelve un array
    //     this.data = Object.values(this.ar);
    //     console.log(this.data);
    //     this.dtTrigger.next(this.data);
    //     console.log('entro en consola')
    //   },
    //   error =>{
    //     console.log('se acabaron los intentos de la API')
    //   }
    // )
  

  ngOnDestroy():void{
    this.dtTrigger.unsubscribe();

  }

}
