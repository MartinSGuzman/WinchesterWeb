import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

    this.totalCostoReceta();
  } 

  ngOnInit(): void {
  }

  cargarRecetas() {
    this.recetaService.getRecetas().subscribe(
      result => {
        result.forEach((element: any) => {
          let unReceta: Receta = new Receta();
          Object.assign(unReceta, element)
          this.recetass.push(unReceta)
          unReceta = new Receta();
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
          this.router.navigate(['receta']);
          this.cargarRecetas();
          window.location.reload();
        }
      },
      error => {
        if (error.status == "0") {
          alert(error.msg);
        }
      }

    )
  }

  agregarReceta() {
    this.router.navigate(['receta-form/', 0])
  }

  totalCostoReceta(): number {
    let total = 0;
    for (const costoReceta of this.recetass) {
      total += costoReceta.costoTotal;
    }
    return total;
  }
}