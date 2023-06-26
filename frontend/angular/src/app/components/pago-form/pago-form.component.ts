import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pago } from 'src/app/models/pago';
import { PagoService } from 'src/app/services/pago.service';

@Component({
  selector: 'app-pago-form',
  templateUrl: './pago-form.component.html',
  styleUrls: ['./pago-form.component.css']
})
export class PagoFormComponent implements OnInit {

  pago!:Pago;
  accion:string="";

  constructor(private activateRouted : ActivatedRoute,
              private pagoServicio: PagoService) {
                this.pago = new Pago();
               }

  ngOnInit(): void {
    this.activateRouted.params.subscribe(params=>{
      if (params['id']== '0'){
        this.accion = "new";
      }else{
        this.accion = "update";
        this.cargarPagos(params['id']);
      }
    });

  }

  cargarPagos(id: string){
    this.pagoServicio.getPago(id).subscribe(
      result=>{
        console.log(result);
        Object.assign(this.pago,result);
      },
      error=>{

      }
    )
  }

  guardarPago(){
    this.pagoServicio.crearPago(this.pago).subscribe(
      result=>{
        if(result.status == 1){
          alert(result.msg);
        }
      },
      error=>{
        alert(error.msg)
      }
    )
  }

}
