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
    //this.cargarPagos();
    this.pagos = new Array<Pago>();
  }

  

  ngOnInit(): void {
    this.pagoService.getPagos().subscribe(
      result=>{
        this.pagos = Object.values(result);
    
      },
      error=>{

      }
    )
  }

   cargarPagos(){
     this.pagoService.getPagos().subscribe(
      result=>{
        this.pagos = Object.values(result);
    
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
    if(confirm("SEGURO QUE DESEA ELIMINAR?")){
      this.pagoService.deletePago(pago._id).subscribe(
        result => {
          if (result.status == "1") {
            alert("ticket eliminado");
            this.cargarPagos();
          }
        },
        error => {
          if (error.status == "0") {
            alert(error.msg);
          }
        }
  
      )
    }
    
  }


}
