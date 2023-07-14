import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pago } from 'src/app/models/pago';
import { Pedido } from 'src/app/models/pedido';
import { Receta } from 'src/app/models/receta';
import { PagoService } from 'src/app/services/pago.service';
import { PedidoService } from 'src/app/services/pedido.service';
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
  pedidos!:Array<Pedido>;
  pedidoSeleccionado!:Pedido;
  

  constructor(private activateRouted : ActivatedRoute,
              private pagoServicio: PagoService,
              private recetaService : RecetaService,
              private router: Router,
              private pedidoService: PedidoService) {
                this.pago = new Pago();
                this.pedidoSeleccionado = new Pedido();
                this.recetas = new Array<Receta>();
               }

  ngOnInit(): void {
    
    this.activateRouted.params.subscribe(params=>{
      if (params['id']== '0'){
        this.accion = "new";
        this.cargarReceta();
        this.cargarPedido();
      }else{
        this.accion = "update";
        this.cargarPagos();
        this.cargarPago(params['id']);
        this.cargarReceta();
      }
    });

  }

  cargarPedido(){
    this.pedidoService.getPedidos().subscribe(
      result=>{
        this.pedidos = Object.values(result);
      }
    )
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
        console.log('estoy en cargar Pago',this.pago)
        //this.pago.receta = this.recetas.find(item => (item._id == this.pago.receta._id))!;
      },
      error=>{

      }
    )
  }
  total!:number;

  guardarPago(){
    console.log(this.pedidoSeleccionado);
    this.pago.pedido = this.pedidoSeleccionado._id;
    this.pago.total = this.pedidoSeleccionado.total;
    this.pago.nombreCliente = this.pedidoSeleccionado.nombreCliente;
    this.pago.mesa = this.pedidoSeleccionado.mesa;
    if(confirm("DESEA AGREGAR EL PAGO?")){
      console.log(this.pago)
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

  

}
