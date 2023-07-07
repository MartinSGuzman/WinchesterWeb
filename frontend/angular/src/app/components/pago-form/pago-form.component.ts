import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pago } from 'src/app/models/pago';
import { Receta } from 'src/app/models/receta';
import { PagoService } from 'src/app/services/pago.service';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-pago-form',
  templateUrl: './pago-form.component.html',
  styleUrls: ['./pago-form.component.css']
})
export class PagoFormComponent implements OnInit {

  pago!:Pago;
  accion:string="";
  recetas:Array<Receta>;
  band: boolean = false;

  monto1!:number;
  monto2!:number;
  cant1!:number;
  cant2!:number;
  montoTotal!:number;

  constructor(private activateRouted : ActivatedRoute,
              private pagoServicio: PagoService,
              private recetaService : RecetaService,
              private router: Router) {
                this.pago = new Pago();
                this.recetas = new Array<Receta>();
               }

  ngOnInit(): void {
    this.activateRouted.params.subscribe(params=>{
      if (params['id']== '0'){
        this.accion = "new";
        this.cargarReceta();
      }else{
        this.accion = "update";
        this.cargarPagos();
        this.cargarPago(params['id']);
        this.cargarReceta();
      }
    });

  }

  cargarReceta(){
    this.recetaService.getRecetas().subscribe(
      result=>{
        this.recetas = Object.values(result);
      },
      error=>{

      }
    )
  }

  cargarPagos(){
    this.pagoServicio.getPagos().subscribe(
      result=>{
        console.log(result);
        Object.assign(this.pago,result);
      },
      error=>{

      }
    )
  }

  cargarPago(id:string){
    this.pagoServicio.getPago(id).subscribe(
      result=>{
        console.log(result);
        Object.assign(this.pago,result);
        //this.pago.receta = this.recetas.find(item => (item._id == this.pago.receta._id))!;
      },
      error=>{

      }
    )
  }

  guardarPago(){
    if(confirm("DESEA AGREGAR EL PAGO?")){
      this.pagoServicio.crearPago(this.pago).subscribe(
        result=>{
          if(result.status == 1){
            alert(result.msg);
            this.router.navigate(["pago"])
          }
        },
        error=>{
          this.band = true;
        }
      )
    }
  }

  actualizarPago(){
    if(confirm("DESEA ACTUALIZAR EL PAGO?")){
      this.pagoServicio.editPago(this.pago).subscribe(
        result=>{
          if(result.status == 1){
            alert(result.msg);
            this.router.navigate(["pago"])
          }
        },
        error=>{
          this.band = true;
        }
      )
    }
  }

  listarPagos(){
    this.router.navigate(["pago"])
  }

  costoTotal():number{
    let total = 0;
        total = ( (this.cant1 * this.monto1)+(this.cant2 * this.monto2));
    return total;
  }
  // monto1!:number;
  // monto2!:number;
  // cant1!:number;
  // cant2!:number;
  // montoTotal!:number;

}
