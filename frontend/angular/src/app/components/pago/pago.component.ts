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
  deb:number = 0;
  cont:number = 0;
  cred:number = 0;
  filtrarPago!: string;

  constructor( private pagoService : PagoService,
               private router:Router) { 
    //this.cargarPagos();
    this.pagos = new Array<Pago>();
  }

  

  ngOnInit(): void {
    this.pagoService.getPagos().subscribe(
      result=>{
        this.pagos = Object.values(result);
         this.pagos.forEach(pagos => {
           if (pagos.metodo == 'Contado'){
             this.cont = this.cont + 1;
             console.log(this.cont);
           }
           if (pagos.metodo == 'Credito'){
            this.cred = this.cred + 1;
            console.log(this.cred);
          }
          if (pagos.metodo == 'Debito'){
            this.deb = this.deb + 1;
            console.log(this.deb);
          }
         })
        // let i;
        // for(i = 0; i <= this.pagos.length; i++){
        //   if( this.pagos[i].metodo == 'contado'){
        //     this.cont = this.cont + 1;
        //     console.log(this.pagos.length)
        //   }
        // }
        
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

//el filtro por metodo funciona perfecto 
filtrarPorMetodo() {
  this.pagoService.getPagoXmetodo(this.filtrarPago).subscribe(
    result => {
      this.pagos = [];
      Object.assign(this.pagos, result);
      console.log(result);
    },
    error => {
      console.log(error);
    }
  )
}

limpiar() {
  this.filtrarPago = '';
  //recarga la pagina asi se actualiza el table
  this.router.navigate(['pago']);
  //this.cargarTickets();

  //recarga la pagina
  window.location.reload();
}
}
