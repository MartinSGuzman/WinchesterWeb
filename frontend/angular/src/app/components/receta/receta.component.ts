import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { Receta } from 'src/app/models/receta';
import { RecetaService } from 'src/app/services/receta.service';

@Component({
  selector: 'app-receta',
  templateUrl: './receta.component.html',
  styleUrls: ['./receta.component.css']
})
export class RecetaComponent implements OnInit {

  receta!: Receta;
  recetass!: Array<Receta>;

  constructor(private recetaService: RecetaService,
    private router: Router) {
    this.receta = new Receta();
    this.recetass = new Array<Receta>();
    this.cargarRecetas();
  } 

  ngOnInit(): void {
  }

  arrayRecetas: Receta[] = [];

  cargarRecetas() {
    this.recetaService.getRecetas().subscribe(
      result => {
        result.forEach((element: any) => {
          let unReceta: Receta = new Receta();
          Object.assign(unReceta, element)
          this.recetass.push(unReceta)
          unReceta = new Receta();
          this.agregarProductoReceta();
        });
        console.log(result);
      },
      error => {
        console.log(error);
      }
    )
  }

  modificarReceta(receta: Receta) {
    this.router.navigate(['receta-form/', receta._id]);
  }

  eliminarReceta(receta: Receta) {
    this.recetaService.deleteReceta(receta._id).subscribe(
      result => {
        if (result.status == "1") {
          console.log(result.msg);
          
          this.cargarRecetas();
          
        }
      },
      error => {
        if (error.status == "0") {
          alert(error.msg);
        }
      }

    )
  }

  public agregarProductoReceta() {
    const observables: Observable<any>[] = [];

    this.arrayRecetas.forEach(receta => {
      receta.obProducto = []; // Inicializar el arreglo de items extra para cada pedido

      if (receta.producs && receta.producs.length > 0) {
        receta.producs.forEach(pro => {
          const id = pro.produ; // Obtener el valor del id desde la propiedad item
          const observable: Observable<any> = this.recetaService.getReceta(id);
          observables.push(observable);
        });
      }
    });

    forkJoin(observables).subscribe(
      respuestas => {
        let index = 0;
        this.arrayRecetas.forEach(receta => {
          receta.obProducto = respuestas.slice(index, index + receta.producs.length);
          index += receta.producs.length;
        });
        console.log(respuestas);
      },
      error => {
        console.log(error);
        console.log('No hay items de pedido');
      }
    );
  }

  agregarReceta() {
    this.router.navigate(['receta-form/', 0])
  }
}