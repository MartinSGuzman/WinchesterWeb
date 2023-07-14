import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { Pago } from 'src/app/models/pago';
import { PagoService } from 'src/app/services/pago.service';
import { RecetaService } from 'src/app/services/receta.service';

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
   pag!:Array<Pago>;
   fechas! :  Array<string>;
   fech : any ;

  constructor( private pagoService : PagoService,
               private router:Router,
               private recetaService:RecetaService) { 
    //this.cargarPagos();
    this.pagos = new Array<Pago>();
    
  }

  

  ngOnInit(): void {
    this.recorrerPago();
    
    

    this.pagoService.getPagos().subscribe(
      result=>{
        this.pagos = Object.values(result);
        console.log(this.pagos)
        
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
  this.cargarPagos();

  //recarga la pagina
  
}



public recorrerPago() {
  this.pagoService.getPagos().subscribe(result => {
    this.pag = result;

    this.fechas = []; // Reiniciar el array de fechas

    this.pag.forEach(pago => {
      this.fechas.push(pago.fecha);
    });

    const contadorPorMes = this.contarFechasPorMes(this.fechas);

    contadorPorMes.forEach((contador, mes) => {
      console.log('${mes}: ${contador}');
    });
  });
}



public contarFechasPorMes(fechas: string[]): Map<string, number> {
  const contadorPorMes: Map<string, number> = new Map();

  for (const fechaStr of fechas) {
    const fecha = new Date(fechaStr);
    const mes = fecha.toLocaleString('default', { month: 'long' });

    if (contadorPorMes.has(mes)) {
      contadorPorMes.set(mes, contadorPorMes.get(mes)! + 1);
    } else {
      contadorPorMes.set(mes, 1);
    }
  }

  return contadorPorMes;
}

  

}





