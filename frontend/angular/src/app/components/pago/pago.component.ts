import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { Pago } from 'src/app/models/pago';
import { Pedido } from 'src/app/models/pedido';
import { PagoService } from 'src/app/services/pago.service';
import { PedidoService } from 'src/app/services/pedido.service';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.component.html',
  styleUrls: ['./pago.component.css']
})
export class PagoComponent implements OnInit {


  pagos!:Array<Pago>;
  deb:number = 0;
  
  cred:number = 0;
  filtrarPago!: string;
   pag!:Array<Pago>;
   fechas! :  Array<string>;
   
   fecha!:Array<Pedido>;

   cont1:number = 0;
   cont2:number = 0;
   cont3:number = 0;
   cont4:number = 0;
   cont5:number = 0;
   cont6:number = 0;
   cont7:number = 0;
   cont8:number = 0;
   cont9:number = 0;
   cont10:number = 0;
   cont11:number = 0;
   cont12:number = 0;

  
  constructor(private pagoService: PagoService,
    private router: Router,
    private recetaService: RecetaService) {

    //this.cargarPagos();
    this.pagos = new Array<Pago>();

    this.totalPago();
    this.eliminarTodasLasFilas();
  }


  ngOnInit(): void {

    this.getFecha();
    this.recorrerPago();




    this.pagoService.getPagos().subscribe(
      result => {
        this.pagos = Object.values(result);
        console.log(this.pagos)

        
        



      },
      error => {

      }
    )
  }

  public recorrerPago() {
    this.pagoService.getPagos().subscribe(result => {
      this.pag = result;
  
      this.fechas = []; // Reiniciar el array de fechas
  
      this.pag.forEach(pago => {
        this.fechas.push(pago.fecha);
        console.log('estoy en recorrer pago',this.fechas);
        const fecha = new Date(pago.fecha);
        console.log(fecha);
        const mes = fecha.getMonth() + 1;
        console.log(mes);
        switch (mes) {
          case 1:
            this.cont1 = this.cont1 + 1;
            console.log(this.cont1);
            break;
        
          case 2:
            this.cont2 = this.cont2 + 1;
            console.log(this.cont2);
            break;
        
          case 3:
            this.cont3 = this.cont3 + 1;
            console.log(this.cont3);
            break;
            
          
            case 4:
              this.cont4 = this.cont4 + 1;
              console.log(this.cont4);
              break;
          
            case 5:
              this.cont5 = this.cont5 + 1;
              console.log(this.cont5);
              break;

              case 6:
                this.cont6 = this.cont6 + 1;
                console.log(this.cont6);
                break;
            
              case 7:
                this.cont7 = this.cont7 + 1;
                console.log(this.cont7);
                break;
            
              case 8:
                this.cont8 = this.cont8 + 1;
                console.log(this.cont8);
                break;

                case 9:
                  this.cont9 = this.cont9 + 1;
                  console.log(this.cont9);
                  break;

                  case 10:
                this.cont10 = this.cont10 + 1;
                console.log(this.cont10);
                break;

                case 11:
                this.cont11 = this.cont11 + 1;
                console.log(this.cont11);
                break;

                case 12:
                this.cont12 = this.cont12 + 1;
                console.log(this.cont12);
                break;
        
          default:
            // Acción por defecto si no se cumple ninguno de los casos anteriores
            break;
        }
        //let fecha = new Date(fechaString);
        //let mes = fecha.getMonth() + 1; // Se suma 1 porque los meses en JavaScript son indexados desde 0

    //console.log(mes); 
      })
    })
  }

  

  getFecha():number {
    let fechaString = '2023-07-13';
  let fecha = new Date(fechaString);
  let mes = fecha.getMonth() + 1; // Se suma 1 porque los meses en JavaScript son indexados desde 0

console.log(mes); 
return mes;
  }
  // Resultado: 7




  cargarPagos() {
    this.pagoService.getPagos().subscribe(
      result => {
        this.pagos = Object.values(result);

      },
      error => {

      }
    )
  }


  agregarPago() {
    this.router.navigate(["pago-form", 0])
  }

  modificarPago(pago: Pago) {
    this.router.navigate(["pago-form", pago._id])
  }

  eliminarPago(pago: Pago) {
    if (confirm("SEGURO QUE DESEA ELIMINAR?")) {
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
  totalPago(): number {
    let total = 0;
    for (const costoPag of this.pagos) {
      total += costoPag.total;
    }
    return total;
  }

  eliminarTodasLasFilas(){
    // Eliminar todas las filas de la tabla
    this.pagos = [];
}


}





