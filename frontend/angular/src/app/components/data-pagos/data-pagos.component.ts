import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-data-pagos',
  templateUrl: './data-pagos.component.html',
  styleUrls: ['./data-pagos.component.css']
})
export class DataPagosComponent implements OnInit {

  constructor( private pagoService : PagoService) { }

  dtOptions : DataTables.Settings = {};
  dtTrigger : Subject<any> = new Subject<any>();

  datos : any = [];

  ngOnInit():void{
    this.dtOptions = {
      pagingType : 'full_pages',
      pageLength : 5,
    },this.pagoService.getPagos().subscribe(
      result =>{
        this.datos = Object.values(result);
        console.log(this.datos);
        this.dtTrigger.next(this.datos);
      }
    )
  }
  

  ngOnDestroy():void{
    this.dtTrigger.unsubscribe();

  }

}
