import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pago } from 'src/app/models/pago';
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {

  pagos!:Array<Pago>;

  constructor( private pagoService : PagoService,
               private router:Router) { 
    this.cargarPagos()
    this.pagos = new Array<Pago>();
  }

  ngOnInit(): void {
    
  }

  cargarPagos(){
    this.pagoService.getPagos().subscribe(
      result=>{
        let unPago:Pago = new Pago();
        result.foreach((element:any)=>{
          Object.assign(unPago,element)
          this.pagos.push(unPago);
          unPago = new Pago();
        })

      },
      error=>{

      }
    )
  }

  agregarPago(){
    this.router.navigate(["pago-form",0])
  }

  modificarPago(pago:Pago){
    this.router.navigate(["pago-form",pago._id])
  }

  eliminarPago(pago:Pago){
    
  }
}
