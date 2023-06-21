import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/producto';
import { Receta } from 'src/app/models/receta';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-receta-form',
  templateUrl: './receta-form.component.html',
  styleUrls: ['./receta-form.component.css']
})
export class RecetaFormComponent implements OnInit {

  receta!: Receta;
  accion: string = "new" // accion tendra los valores de new o update
  productosss!: Array<Producto>;

  constructor(private recetaService: RecetaService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.receta = new Receta()
    this.productosss = new Array<Producto>();
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params['id'] == "0") {
        this.accion = "new";
      } else {
        this.accion = "update";
        this.cargarReceta(params['id']);
      }
    });
  }

  cargarReceta(id: string) {
    this.recetaService.getReceta(id).subscribe(
      result => {
        Object.assign(this.receta, result);
        //añadir los valores en una lista despleglable
        //this.sector.responsable = this.agentes.find(item => (item._id == this.sector.responsable._id))!;
        console.log(result);
      },
      error => {
        console.log(error);
      }
    )
  }

  registrar() {

  }

  actualizarReceta() {

  }

  volverLista() {
    this.router.navigate(['receta'])
  }
}
